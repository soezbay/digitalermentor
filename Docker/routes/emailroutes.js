//emailroutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const emailController = require('../controllers/emailController');

// Assuming your backend API endpoint for fetching user information is 'http://localhost:8000/benutzer'
//const API_BASE_URL = 'http://localhost:8000';
//const BENUTZER_API_ENDPOINT = '/benutzer';

// Function to fetch user data from the database
/*async function fetchDataFromDatabase() {
  try {
    const response = await axios.get(API_BASE_URL + BENUTZER_API_ENDPOINT);
    return response.data.benutzer;
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    throw error;
  }
}
*/
// Define your email routes here
// For example, a route to trigger sending emails to all users
router.post('/send-emails', async (req, res) => {
  try {
    // Fetch user data from the database
   // const users = await fetchDataFromDatabase();

    // Send emails using the controller
    //await emailController.sendEmails(users);
    await emailController.sendEmails();

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
