const nodemailer = require("nodemailer");

// USE mailtrap to test the multiple email sending methods
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "",
    pass: "",
  },
});

// checking connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is running...");
  }
});

module.exports = transporter;
