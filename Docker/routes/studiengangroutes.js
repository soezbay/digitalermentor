const express = require('express');
const studiengangControllers = require('../controllers/studiengangController');
const router = express.Router();
// Beispiel: localhost:8000/studiengang
router.route("/").get(studiengangControllers.getAlleStudiengaenge);
// Beispiel: localhost:8000/studiengang/pflicht/PI
router.route("/pflicht/:Studiengang").get(studiengangControllers.getPflichtModuleVonStudiengang);
// Beispiel: localhost:8000/studiengang/wahlpflicht/PI
router.route("/wahlpflicht/:Studiengang").get(studiengangControllers.getWahlpflichtModuleVonStudiengang);
// Beispiel: localhost:8000/studiengang/PI
router.route("/:Studiengang").get(studiengangControllers.getStudiengangInfo);

module.exports = router;