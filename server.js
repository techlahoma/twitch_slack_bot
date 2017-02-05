const BidiBot = require('./BidiBot');
const config = require('./config');
const http = require('http');

const herokuUrl = process.env.HEROKU_URL;

// Create and start listening on server.
http.createServer((req,res) =>{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('This is a relay server');
}).listen(process.env.PORT || 8080);

// Ping server to keep alive.
setInterval(() => {
    console.log('ping sent to server for keep alive');
    http.get(`http://${ herokuUrl }.herokuapp.com`);
}, 100000);

// Config options
const slackKey = process.env.SLACK_KEY || config.slackKey,
    slackName = process.env.SLACK_NAME || config.slackName,
    slackChannel = process.env.SLACK_CHANNEL || config.slackChannel,
    twitchName = process.env.TWITCH_NAME || config.twitchName,
    twitchKey = process.env.TWITCH_KEY || config.twitchKey,
    twitchChannel =	process.env.TWITCH_CHANNEL || config.twitchChannel;

// Create BidiBot object
const bidiBot = new BidiBot({
    slackKey,
    slackName,
    slackChannel,
    twitchName,
    twitchKey,
    twitchChannel
});

// Start the bot.
bidiBot.start();

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down');
    process.nextTick(() => process.exit());  	
});

process.on('exit', (code) => {
    console.error('Process is about to exit with code ',code);
});
