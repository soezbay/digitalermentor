const nodemailer = require('nodemailer');
const Email = require('./module/Email');
require("dotenv").config();

// Function to send an email
const sendEmail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
});

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

};

// Function to send an email and store it in the database
const sendEmailAndStore = async (to, subject, body, benutzerID) => {
  // Send the email
  await sendEmail(to, subject, body);

  // Store the email in the database
  const email = new Email(body, benutzerID);
  await email.addEmails();
};

// Example usage
const to = 'foguengmerveille@gmail.com';
const subject = 'Test Email';
const body = 'This is a test email body.';
const benutzerID = 'Test123'; // You need to replace this with the actual BenutzerID

sendEmailAndStore(to, subject, body, benutzerID);

module.exports = {
    sendEmailAndStore,
  };