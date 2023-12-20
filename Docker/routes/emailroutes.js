const express = require('express');
const emailControllers = require('../controllers/emailController');
const router = express.Router();

router.route("/").post(emailControllers.createNewEmail);

router.route("/deleteEmail/:EmailID").delete(emailControllers.deleteEmail);
// Beispiel: localhost:8000/email/Test123
router.route("/:BenutzerID").get(emailControllers.getEmailsFromBenutzer);

module.exports = router;