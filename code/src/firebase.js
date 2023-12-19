// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, requestPermission } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkmAbjKpLu2rxG3yWsFBC9lNnDSKEm73Q",
  authDomain: "digitaler-mentor.firebaseapp.com",
  projectId: "digitaler-mentor",
  storageBucket: "digitaler-mentor.appspot.com",
  messagingSenderId: "484919134760",
  appId: "1:484919134760:web:e2ed382fbdfe21b892c31d",
  measurementId: "G-08DWY0HM6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();
// Add the public key generated from the console here.
getToken(messaging, {vapidKey: process.env.PUBLIC_VAPID_KEY});

requestPermission()
  .then(() => getToken(messaging))
  .then((token) => {
    console.log('Requesting permission...');
    console.log("FCM Token:", token);
    // Send the token to your server for association with the user
  })
  .catch((error) => console.error("Error getting permission:", error));
  messaging.onMessage((payload) => {
    console.log("Message received:", payload);
    // Handle the incoming notification and update your UI
    const notification = {
      title: payload.notification.title,
      body: payload.notification.body,
    };
    // Update your UI with the received notification
  });
  