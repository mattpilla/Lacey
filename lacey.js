const auth = require('./auth.json');
const twitch = require('tmi.js').client(auth);

const commands = require('./js/commands.js');

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
    // Get each word of command in an array
    let args = message.split(' ');

    if (message === 'hey') {
        twitch.say(channel, 'shut the fuck up');
    } else if (args[0] === '!wr' && args.length > 1) {
        commands.getWR(args, (err, msg) => {
            twitch.say(channel, msg);
        });
    } else if (args[0] === '!define' && args.length > 1) {
        commands.define(args, (err, msg) => {
            twitch.say(channel, msg);
        });
    }
});

/***
 * Log uncaught errors
 ***/
process.on('uncaughtException', err => {
    console.log('well, fuck: ' + err);
});
