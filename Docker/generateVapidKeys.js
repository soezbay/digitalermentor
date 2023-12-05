// generateVapidKeys.js
const webpush = require('web-push');

const { publicKey, privateKey } = webpush.generateVAPIDKeys();

console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey);
