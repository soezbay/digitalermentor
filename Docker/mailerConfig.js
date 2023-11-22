
const nodemailer = require('nodemailer');

// Fonction de configuration de Nodemailer
function configureMailer() {
  return nodemailer.createTransport({
    service: 'gmail', // Remplacez par votre service SMTP
    auth: {
        user: 'digitalermentor@gmail.com',
        pass: 'ofgcyulfkcnvbdnw',
    }
    
}).verify(function(error, success) {
    if (error) {
      console.error('Nodemailer verification error:', error);
    } else {
      console.log('Nodemailer server is ready to take our messages');
    }
  });
}

module.exports = configureMailer;
