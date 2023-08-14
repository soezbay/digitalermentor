const express = require('express');
const bewertungControllers = require('../controllers/bewertungController');
const router = express.Router();

router.route("/").get(bewertungControllers.getAlleBewertungen).post(bewertungControllers.createNewBewertung);

module.exports = router;