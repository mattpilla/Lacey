const auth = require('./auth.json');
const twitch = require('tmi.js').client(auth);

twitch.connect();

var homeChannel = auth.channels[0];

// Take input from terminal
const readline = require('readline').createInterface({
    input: process.stdin
});
// Message home channel directly through terminal
readline.on('line', line => {
    twitch.say(homeChannel, line);
});

/***
 * Message read
 ***/
twitch.on('chat', (channel, userstate, message, self) => {
    if (self) {
        // Ignore own messages
        return;
    }
    if (message === 'hey') {
        twitch.say(channel, 'shut the fuck up');
    }
});

/***
 * Log uncaught errors
 ***/
process.on('uncaughtException', err => {
    console.log('well, fuck: ' + err);
});
