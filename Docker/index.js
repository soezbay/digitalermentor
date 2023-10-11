const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const modulRoutes = require('./routes/modulroutes');
const bewertungsRoutes = require('./routes/bewetungroutes');
const studiengangRoutes = require('./routes/studiengangroutes');
const modulZielRoutes = require('./routes/modulZielroutes');

app.use('/modul', modulRoutes);
app.use('/bewertung', bewertungsRoutes);
app.use('/studiengang', studiengangRoutes);
app.use('/modulZiel', modulZielRoutes);

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
