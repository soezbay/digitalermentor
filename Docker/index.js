const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//Middleware
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});

const modulRoutes = require('./routes/modulroutes');
const bewertungsRoutes = require('./routes/bewetungroutes');
const studiengangRoutes = require('./routes/studiengangroutes');
const modulZielRoutes = require('./routes/modulZielroutes');
const cacheRoutes = require('./routes/cacheroutes');
const benutzerRoutes = require('./routes/benutzerroutes')
const emailRoutes = require('./routes/emailroutes');

app.use('/modul', modulRoutes);
app.use('/bewertung', bewertungsRoutes);
app.use('/studiengang', studiengangRoutes);
app.use('/modulZiel', modulZielRoutes);
app.use('/cache', cacheRoutes);
app.use('/benutzer',benutzerRoutes);
app.use('/email',emailRoutes);


//Global Error Handler
app.use((err,req,res,next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message : "Es ist ein Fehler aufgetreten"
  })
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));
