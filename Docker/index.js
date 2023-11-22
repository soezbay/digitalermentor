const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
var orm     = require('orm');
const configureMailer = require('./mailerConfig');
const { findAll } = require('./controllers/alertController');
//const { runSendAlerts } = require('./timing/alerttimimg');

// Importez le module d'alerte
const { sendAlerts } = require('./controllers/alertController');

// Appel de la fonction sendAlerts
sendAlerts();

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const modulRoutes = require('./routes/modulroutes');
const bewertungsRoutes = require('./routes/bewetungroutes');
const studiengangRoutes = require('./routes/studiengangroutes');
const modulZielRoutes = require('./routes/modulZielroutes');
const alertRoutes = require('./routes/alertroutes');

/*
//Test
app.get('/', (req, res) => {
  res.send('Lapplication est en cours dexécution.');
});*/

app.use('/modul', modulRoutes);
app.use('/bewertung', bewertungsRoutes);
app.use('/studiengang', studiengangRoutes);
app.use('/modulZiel', modulZielRoutes);
app.use('/alerts', alertRoutes);

//Global Error Handler
app.use((err,req,res,next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message : "Es ist ein Fehler aufgetreten"
  });
});

const port = process.env.PORT || 8000;
const transporter = configureMailer();

//runSendAlerts();

app.listen(port, () =>  
  console.log(`Server is running on http://localhost:${port}`)
  );