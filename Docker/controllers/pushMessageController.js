//emailController.js

const nodemailer = require('nodemailer');
const axios = require('axios');
const emailTemplates = require('../templates/emailTemplates');
const webpush = require('web-push');
require("dotenv").config();

// Assuming your backend API endpoint for fetching user information is 'http://localhost:8000/benutzer'
const API_BASE_URL = 'http://localhost:8000';
const BENUTZER_API_ENDPOINT = '/benutzer';

// Set up VAPID keys and other web push configurations
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('digitalermentor@gmail.com', publicVapidKey, privateVapidKey);

async function sendPushMessage() {
  try {
    // Get users' information from the database
    const response = await axios.get(API_BASE_URL + BENUTZER_API_ENDPOINT);
    const usersInfo = response.data.benutzer;

  // Assuming each user has a pushSubscription property
  usersInfo.forEach(async (user) => {
    if (user.pushSubscription) {
      // Send push notifications to users with push subscriptions
      const payload = JSON.stringify({ title: 'New Notification' });
      await webpush.sendNotification(user.pushSubscription, payload);
      console.log(`Push notification sent to ${user.Vorname} ${user.Nachname}`);
    } else {
      console.log(`User ${user.Vorname} ${user.Nachname} does not have a push subscription`);
    }
  });

  console.log('Push notifications sent to all users');
} catch (error) {
  console.error('Error sending push notifications:', error);
}
}

module.exports = {
  sendPushMessage,
};
