//emailController.js

const nodemailer = require('nodemailer');
const axios = require('axios');
const emailTemplates = require('../templates/emailTemplates');
require("dotenv").config();

// Backend API endpoint for fetching user information is 'http://localhost:8000/benutzer'
const API_BASE_URL = 'http://localhost:8000';
const BENUTZER_API_ENDPOINT = '/benutzer';


async function sendEmails() {
  try {
    // Get users' information from the database
    const response = await axios.get(API_BASE_URL + BENUTZER_API_ENDPOINT);
    const usersInfo = response.data.benutzer;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Loop through the users and send emails
   usersInfo.forEach(async (user) => {
      const {EMail} = user;
      const emailText = emailTemplates.messageSemesteranfang(user);
      const betreffEmails = emailTemplates.betreffEmails();

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: EMail,
        subject: betreffEmails,
        text: emailText,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      
      console.log(`Email sent to ${EMail}`);
    });

    // Close the transporter
    transporter.close();
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}

module.exports = {
  sendEmails,
};
