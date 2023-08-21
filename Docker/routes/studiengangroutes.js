const express = require('express');
const studiengangControllers = require('../controllers/studiengangController');
const router = express.Router();

router.route("/").get(studiengangControllers.getAlleStudiengaenge);

router.route("/pflicht/:Studiengang").get(studiengangControllers.getPflichtModuleVonStudiengang);

router.route("/wahlpflicht/:Studiengang").get(studiengangControllers.getWahlpflichtModuleVonStudiengang);

module.exports = router;