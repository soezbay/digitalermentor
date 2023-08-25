const express = require('express');
const modulControllers = require('../controllers/modulControllers');
const router = express.Router();

router.route("/").get(modulControllers.getAlleModule);

router.route("/:Modul").get(modulControllers.getAlleBewertungenVonModul);

router.route("/:Studiengang/:Modul").get(modulControllers.getModul);

module.exports = router;
