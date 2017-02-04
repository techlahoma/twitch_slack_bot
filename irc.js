const Bidi = require('./bidibot.js');
const config = require('./config.js');
const http = require('http');

let herokuUrl = process.env.HEROKU_URL;

http.createServer((req,res) =>{
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end("This is a relay server");

}).listen(process.env.PORT || 8080);

setInterval(function() {
	console.log('ping sent to server for keep alive');
    http.get("http://"+herokuUrl+".herokuapp.com");
}, 100000);



// let slackKey = process.env.SLACK_KEY;
// let slackName = process.env.SLACK_NAME;
// let slackChannel = process.env.SLACK_CHANNEL;
// let twitchName = process.env.TWITCH_NAME;
// let twitchKey = process.env.TWITCH_KEY;
// let twitchChannel=process.env.TWITCH_CHANNEL;


// let bidi = new Bidi({
// 	slackKey,
// 	slackName,
// 	slackChannel,
// 	twitchName,
// 	twitchKey,
// 	twitchChannel
// })

    
let bidi = new Bidi({
	slackKey : config.slackkey,
	slackName : config.slackname ,
	slackChannel: config.slackChannel,
	twitchName : config.twitchname,
	twitchKey: config.twitchkey,
	twitchChannel: config.twitch_channels
})



bidi.start();

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down');
  process.nextTick(() => process.exit());  	
 });

process.on('exit', (code) => {
  console.error("Process is about to exit with code ",code);
});
