const express = require('express');
const modulControllers = require('../controllers/modulControllers');
const router = express.Router();

// Beispiel: localhost:8000/modul
router.route("/").get(modulControllers.getAlleModule);
// Beispiel localhost:8000/modul/Status/Test123
router.route("/Status/:BenutzerID").get(modulControllers.getModuleMitStatus);
// Beispiel: localhost:8000/modul/ADS
router.route("/:Modul").get(modulControllers.getAlleBewertungenVonModul);
// Beispiel: localhost:8000/modul/PI/ADS
router.route("/:Studiengang/:Modul").get(modulControllers.getModul);

module.exports = router;
