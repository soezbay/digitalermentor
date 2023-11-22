/*const schedule = require('node-schedule');
const alertController = require('../controllers/alertController');

// Schedule timing to run every day at 12:00 PM
const timing = schedule.scheduleJob('0 12 * * *', async () => {
  console.log('Running scheduled timing to send alerts');
  await alertController.sendAlerts();
});
*/

const alertController = require('../controllers/alertController');

// Appelez directement la fonction sendAlerts
async function runSendAlerts() {
  console.log('Running to send alerts');
  await alertController.sendAlerts();
}

// Exportez la fonction runSendAlerts si vous souhaitez l'utiliser ailleurs
module.exports = { runSendAlerts };