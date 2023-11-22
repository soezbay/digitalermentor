const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController.js');

router.route("/").get(alertController.sendAlerts);
router.route("/all").get(alertController.findAll);


module.exports = router;


/*
router.post('/semesterStart', alertController.alertSemesterStart);
router.post('/result', alertController.alertResult);
router.post('/registerSubject', alertController.alertRegisterSubject);

module.exports = router;
*/
