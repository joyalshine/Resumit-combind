const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { email, subject, message } = options;

  const mailOptions = {
    from: "Arnab Ghosh <hello@arnab.io>",
    to: email,
    subject,
    text: message,
  };

  await transport.verify(); // Verify connection configuration
  await transport.sendMail(mailOptions);
};

// Example usage
sendMail({
  email: "arnab@gmail.com",
  subject: "gubbu",
  message: "jouhhh",
}).catch((error) => {
  console.error(error.message);
});

module.exports = sendMail;
