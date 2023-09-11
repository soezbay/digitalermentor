const express = require('express');
const bewertungControllers = require('../controllers/bewertungController');
const router = express.Router();

// Beispiel: localhost:8000/bewertung
// Hat ein GET und Postbefehl
router.route("/").get(bewertungControllers.getAlleBewertungen).post(bewertungControllers.createNewBewertung);

module.exports = router;