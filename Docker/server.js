require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Backend API endpoint for fetching user information is 'http://localhost:8000/benutzer'
const API_BASE_URL = 'http://localhost:8000';
const BENUTZER_API_ENDPOINT = '/benutzer';

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// API endpoint to fetch notifications
async function fetchData() {
    try {
const response = await axios.get(API_BASE_URL + BENUTZER_API_ENDPOINT);
const userId = response.data.benutzer;
} catch (error) {
    // Handle errors here
    console.error("Error fetching data:", error);
  }
}

  // Implement your logic to fetch notifications for the user from the database
  const sql = `SELECT * FROM Benutzer WHERE BenutzerId = 'User-S2'`;
  const userId = 'User-S2';
  
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Call the async function
fetchData();