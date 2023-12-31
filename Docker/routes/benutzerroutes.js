const express = require('express');
const bewertungControllers = require('../controllers/benutzerController');
const router = express.Router();

// Beispiel: localhost:8000/benutzer
// Hat ein GET und Postbefehl
router.route("/").get(bewertungControllers.getAlleBenutzer);
// Beispiel: localhost:8000/benutzer/Test123
router.route("/:BenutzerID").get(bewertungControllers.getBenutzerVonDerID);

module.exports = router;