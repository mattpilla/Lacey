const auth = require('./auth.json');
const twitch = require('tmi.js').client(auth);

twitch.connect();
