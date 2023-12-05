//pushMessageroutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const webpush = require('web-push');
const pushMessageController = require('../controllers/pushMessageController');

// Define your email routes here
// For example, a route to trigger sending emails to all users
router.post('/send-message', async (req, res) => {
  try {
    // Fetch user data from the database
   // const users = await fetchDataFromDatabase();

    // Send emails using the controller
    //await emailController.sendEmails(users);
    await pushMessageController.sendPushMessage();

    res.status(200).json({ message: 'Push messages sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
