const express = require('express');
const cacheControllers = require('../controllers/cacheController');
const router = express.Router();

// Beispiel: localhost:8000/cache
// Hat ein Put und Postbefehl
router.route("/").post(cacheControllers.createNewCache).put(cacheControllers.updateCache);
// Beispiel: localhost:8000/cache/Test123
router.route("/:BenutzerID").get(cacheControllers.getCache);
router.route("/TimeStamp/:BenutzerID").get(cacheControllers.getLastUpdateTime);
module.exports = router;