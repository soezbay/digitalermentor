// sendEmail.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'digitalermentor@gmail.com',
    pass: 'ofgcyulfkcnvbdnw',
  },
});

const mailOptions = {
  from: 'digitalermentor@gmail.com',
  to: 'foguengmerveille@gmail.com',
  subject: 'Anzahl der Kredit Punkte',
  text: 'Sie haben zum jetzigen Stand 25 CPs insgesamt. Das ist schonmal gut, damit könen Sie aber keine Prüfung der 3. Semesters ablegen. Dafür brauchen Sie noch mindestens 5 CPs. Das schaffen Sie! Viel Mut für Ihr nächtes Klausurphase und denken Sie dran!\n\nViele Grüße,\nDeine Digitaler Mentor',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error sending email: ' + error);
  } else {
    console.log('Email sent successfully: ' + info.response);
  }
});


/*module.exports = {
    EMAIL: 'digitalermentor@gmail.com',
    PASSWORD: 'ofgcyulfkcnvbdnw'
}
*/
