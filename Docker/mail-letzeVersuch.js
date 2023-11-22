const nodemailer = require('nodemailer');
const { Benutzer, Note } = require('./module/Benutzer');

// Function to send email to users on their 2nd exam trial
async function sendVersuchEmails() {
  try {
    // Get users on their 2nd exam trial
    const usersOnSecondTrial = await Note.findAll({
      where: {
        versuchNummer: 2, 
      },
      include: [
        {
          model: Benutzer,
          attributes: ['email', 'name'], 
        },
      ],
    });

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'digitalermentor@gmail.com',
        pass: 'ofgcyulfkcnvbdnw',
      },
    });

    // Loop through users and send emails
    for (const user of usersOnSecondTrial) {
      const { email, name } = user.Benutzer;
      const subject = 'Important: Upcoming Exam';
      const message = `Hi ${name},\n\nDu befindest dich im 3. Versuch. Achte darauf, dass dies dein letzer Versuch ist.\n\nViele Grüße,\nDeine Digitaler Mentor`;

      // Send email
      await transporter.sendMail({
        from: 'digitalermentor@gmail.com',
        to: email,
        subject: subject,
        text: message,
      });

      console.log(`Email sent to ${name} at ${email}`);
    }
  } catch (error) {
    console.error('Error sending Versuch emails:', error.message);
  }
}

// Call the function to send emails
sendVersuchEmails();
