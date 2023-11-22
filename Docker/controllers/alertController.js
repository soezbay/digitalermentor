const transporter = require('../mailerConfig');
const User = require('../module/User');

//const sendAlerts = async () => {
  const sendAlerts = async (req, res, next) => {
  try {
    // Fetch users from the database
    const users = await User.findAll();

    // Check if users is defined and not null before iterating
    if (users && users.length > 0) {
      // Logic for sending alerts based on user data
      users.forEach((user) => {
        // Add your logic here to check semester and send emails accordingly
        if (user.Fachsemester === 2 || user.Fachsemester === 3 || user.Fachsemester === 5) {
          // Send email logic
          console.log(`Sending email to ${user.EMail} for semester ${user.Fachsemester}`);
          
          // Include your email sending logic here
          const mailOptions = {
            from: 'digitalermentor@gmail.com',
            to: user.EMail,
            subject: 'Anzahl der Credit Punkte',
            text: 'Contenu du message',
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email: ' + error);
            } else {
              console.log('Email sent successfully: ' + info.response);
            }
          });
        }
      });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error sending alerts:', error.message);
  //  next(error);
  }
};

const findAll = async (req, res, next) => {
  // ... (le reste du code)

  res.status(200).json({ success: true, message: 'All alerts retrieved successfully' });
};
//module.exports = { findAll };

module.exports = { sendAlerts, findAll };
