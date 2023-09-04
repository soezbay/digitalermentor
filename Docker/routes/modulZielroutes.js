const express = require('express');
const modulControllers = require('../controllers/modulZielControllers');
const router = express.Router();

router.route("/").post(modulControllers.createZiel);

router.route("/:BenutzerID").get(modulControllers.getAllZieleFromBenutzer);

module.exports = router;
