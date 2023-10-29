const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configuration du transporteur de messagerie (Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'votre_email@gmail.com',
    pass: 'votre_mot_de_passe',
  },
});

// Route pour envoyer un e-mail
router.post('/envoyer-email', (req, res) => {
  const mailOptions = {
    from: 'foguengmerveille@gmail.com',
    to: 'foguengmerveille@example.com',
    subject: 'Sujet de l\'e-mail',
    text: 'Contenu de l\'e-mail',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erreur lors de l\'envoi de l\'e-mail.');
    } else {
      console.log('E-mail envoyé : ' + info.response);
      res.status(200).send('E-mail envoyé avec succès.');
    }
  });
});

module.exports = router;
