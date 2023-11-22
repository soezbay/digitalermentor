const nodemailer = require('nodemailer');
const Benutzer = require('./module/Benutzer');

// Funktion, um die erforderlichen Credits für ein Semester zu erhalten
function getRequiredCreditsForSemester(nextSemester) {
  switch (nextSemester) {
    case 3:
      return 30;
    case 4:
      return 50;
    case 5:
      return 70;
    default:
      return 0; // Standardwert für unbekannte Semester
  }
}

  // Function to get current semester based on the date
function getCurrentSemester() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed

  // Semester start dates (you might need to adjust these)
  const winterSemesterStart = new Date(now.getFullYear(), 9 - 1, 1); // October 1
  const summerSemesterStart = new Date(now.getFullYear(), 4 - 1, 1); // April 1

  if (now >= winterSemesterStart && currentMonth <= 3) {
    return 1; // Winter semester
  } else if (now >= summerSemesterStart && currentMonth <= 9) {
    return 2; // Summer semester
  } else {
    return 0; // No active semester
  }
}

  async function sendEmails() {
  try {
    // Get users' information from the database
    const usersInfo = await Benutzer.findAll();

// Annahme: Semesterbeginn-Daten aus der Datenbank abrufen
const nextSemester = benutzerData.Fachsemester + 1;
const requiredCredits = getRequiredCreditsForSemester(nextSemester);

// Überprüfung, ob ausreichend Credits vorhanden sind
const message = benutzerData.Credits >= requiredCredits
  ? `Herzlichen Glückwunsch! Du hast genügend Credits für das kommende Semester (${nextSemester}).`
  : `Achtung! Du benötigst mindestens ${requiredCredits} Credits für das kommende Semester (${nextSemester}).`;


    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
          user: 'digitalermentor@gmail.com',
          pass: 'ofgcyulfkcnvbdnw',
      },
    });

    // Loop through the users and send emails
    usersInfo.forEach(async (user) => {
      const { EMail, Vorname, Nachname } = user;

      // Email content
      const mailOptions = {
        from: 'digitalermentor@gmail.com',
        to: EMail,
        subject: 'Subject of the email',
        text: `Hi ${Vorname} ${Nachname}, This is the content of your email.` , message,
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

// Call the function to send emails
sendEmails();



       /*   //  ---------- Version 2 ------------


// Exemple pour MySQL2
require("dotenv").config();
const mysql = require('mysql2');

// Connexion à la base de données
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB
})

const database = require('./config/database');
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 8003;
const Modul = require('./module/Modul');

console.log('Variables d\'environnement :', process.env);


// Middleware für JSON-Anfragen
app.use(express.json());

  // Funktion, um die erforderlichen Credits für ein Semester zu erhalten
  function getRequiredCreditsForSemester(nextSemester) {
    switch (nextSemester) {
      case 3:
        return 30;
      case 4:
        return 50;
      case 5:
        return 70;
      default:
        return 0; // Standardwert für unbekannte Semester
    }
  }
  
   // Beispiel-Logik zur Datenbankabfrage
 async function getBenutzerData(benutzerId) {
  console.log('Tentative de connexion à la base de données...');
  const query = 'SELECT * FROM Benutzer WHERE BenutzerID = ?';
  try {
    console.log('Avant exécution de la requête SQL...');
    const result = await pool.execute(query, [benutzerId]);

    if (result[0]) {
      const [rows, fields] = result;
      console.log('Après exécution de la requête SQL...', rows);
      // Reste du code...
    } else {
      console.error('Aucune donnée retournée par la requête SQL');
      // Gérer le cas où aucune donnée n'est retournée par la requête SQL
    }
    // Reste du code...
  } catch (error) {
    console.error('Erreur lors de la requête à la base de données:', error);
    throw error;
  }
 }

// Route für den Semesterbeginn
app.get('/Benutzer/:BenutzerID', async (req, res) => {
    try {
      const benutzerId = req.params.BenutzerID;
  
      // Annahme: Benutzerdaten aus der Datenbank abrufen
const benutzerData = await getBenutzerData(benutzerId);

// Überprüfung, ob Benutzerdaten vorhanden sind
if (!benutzerData || !benutzerData.Fachsemester) {
  return res.status(404).send('Benutzer nicht gefunden oder Fachsemester nicht definiert');
}


      // Annahme: Semesterbeginn-Daten aus der Datenbank abrufen
      const nextSemester = benutzerData.Fachsemester + 1;
      const requiredCredits = getRequiredCreditsForSemester(nextSemester);
  
      // Überprüfung, ob ausreichend Credits vorhanden sind
      const message = benutzerData.Credits >= requiredCredits
        ? `Herzlichen Glückwunsch! Du hast genügend Credits für das kommende Semester (${nextSemester}).`
        : `Achtung! Du benötigst mindestens ${requiredCredits} Credits für das kommende Semester (${nextSemester}).`;
  
      

      // Hier E-Mail-Versand-Logik einfügen
      // ...
      // Nodemailer Setup
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'digitalermentor@gmail.com',
          pass: 'ofgcyulfkcnvbdnw',
        },
      });

      const mailOptions = {
        from: 'digitalermentor@gmail.com',
        to: 'foguengmerveille@gmail.com',
        subject: 'Anzahl der Kredit Punkte',
        text: message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email: ' + error);
        } else {
          console.log('Email sent successfully: ' + info.response);
        }
      });   
     
      res.send(message);
    } catch (error) {
      console.error('Fehler bei der Verarbeitung der Anfrage:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Server starten
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  /*
  ... E-Mail-Adressen aus der Datenbank lesen ...

  const nodemailer = require('nodemailer');
const pool = require('./docker/config/database');

// ................... anderer Code

app.get('/semesterStart/:benutzerId', async (req, res) => {
  try {
    const benutzerId = req.params.benutzerId;

    // Datenbankabfrage, um E-Mail-Adresse des Benutzers zu erhalten
    const [rows, fields] = await pool.execute('SELECT EMail FROM Benutzer WHERE BenutzerID = ?', [benutzerId]);

    if (rows.length === 0) {
      res.status(404).send('Benutzer nicht gefunden');
      return;
    }

    const userEmail = rows[0].EMail;

    // E-Mail-Versand-Logik
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'deine@gmail.com',
        pass: 'deinEmailPasswort'
      }
    });

    const mailOptions = {
      from: 'deine@gmail.com',
      to: userEmail,
      subject: 'Betreff der E-Mail',
      text: 'Hier ist der Text der E-Mail.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Fehler beim Versenden der E-Mail');
      } else {
        console.log('E-Mail gesendet: ' + info.response);
        res.send('E-Mail erfolgreich versendet');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

  */
