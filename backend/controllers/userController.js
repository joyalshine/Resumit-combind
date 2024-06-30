const Users = require("./../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getUser = () => {};
exports.createUser = () => {};
exports.updateUser = () => {};
exports.deleteUser = () => {};
