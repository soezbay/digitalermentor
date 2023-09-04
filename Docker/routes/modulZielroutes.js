const express = require('express');
const modulControllers = require('../controllers/modulZielControllers');
const router = express.Router();

// Beispiel: localhost:8000/modulZiel/
//Achtung ist ein Postbefehl
router.route("/").post(modulControllers.createZiel);

// Beispiel: localhost:8000/modulZiel/Test123
router.route("/:BenutzerID").get(modulControllers.getAllZieleFromBenutzer);

module.exports = router;
