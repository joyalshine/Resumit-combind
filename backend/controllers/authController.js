const { promisify } = require("util");
const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/email");
const crypto = require("crypto");
const { jwtDecode } = require("jwt-decode");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;

  res.cookie("authUser", user, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  try {
    const exists = await User.findOne({email: req.body.email})
    if(exists){
      res.json({ status: "fail", message: "User Already Exists" })
      return
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createAndSendToken(user, 201, res);
  } catch (err) {
    res.send({ status: "fail", message: "Failed to create user" });
  }
};

exports.googleOauth = async (req, res) => {
  try {
    const { credential_jwt } = req.body;
    const decoded = jwtDecode(credential_jwt);

    const { email } = decoded;
    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.oauth) {
        createAndSendToken(userExists, 201, res);
      } else {
        return res.json({
          status: "fail",
          message: "This email already exists try loging in using password",
        });
      }
    } else {
      const user = await User.create({
        username: decoded.name,
        email: decoded.email,
        oauth: true,
        password: "cfszczxasas",
        passwordConfirm: "cfszczxasas",
      });
      createAndSendToken(user, 201, res);
    }
  } catch (err) {
    return res.json({ status: "fail", message: "Failed to create user" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email | !password)
      return res.status(400).json({
        status: "fail",
        message: "Please enter the email and password",
      });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({
        status: "fail",
        message: "User not Found",
      });

    if (!(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Password is incorrect",
      });
    }

    createAndSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Failed to create user ${err}`,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    else if (req.cookies.authUser) token = req.cookies.authUser;

    if (!token)
      res.status(401).json({
        status: "fail",
        message: `Not Authorized to access this endpoint`,
      });

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);

    if (!freshUser)
      res.status(401).json({
        status: "fail",
        message: `The token provided is Invalid`,
      });

    const isPasswordChanged = await freshUser.changesPasswordAfter(decoded.iat);

    if (isPasswordChanged) {
      res.status(401).json({
        status: "fail",
        message: `User has recently changed the password. Try logging in again`,
      });
    }

    req.user = freshUser;
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }

  next();
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return next(new AppError("User with this email does not exist", 401));

    const resetToken = await user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/users/resetPassword/${resetToken}`;

    // console.log("------------------");
    // console.log(resetURL);

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\nIf you didn't forget your password, please ignore this email.`;

    try {
      await sendMail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "There was an error sending the email. Try again later!",
          500
        )
      );
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "An error occurred while processing your request",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createAndSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "An error occurred while processing your request",
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: "fail",
        message: "User not found",
      });
    }

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return res.status(401).json({
        success: "fail",
        message: "Your current password is incorrect",
      });
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    createAndSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: "fail",
      message: error.message,
    });
  }
};
