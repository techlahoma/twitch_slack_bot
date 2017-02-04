const Bidi = require('./bidibot.js');
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



let slackKey = process.env.SLACK_KEY;
let slackName = process.env.SLACK_NAME;
let slackChannel = process.env.SLACK_CHANNEL;
let twitchName = process.env.TWITCH_NAME;
let twitchKey = process.env.TWITCH_KEY;
let twitchChannel=process.env.TWITCH_CHANNEL;


let bidi = new Bidi({
	slackKey,
	slackName,
	slackChannel,
	twitchName,
	twitchKey,
	twitchChannel
})

    


process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down');
  process.nextTick(() => process.exit());  	
  });

process.on('exit', (code) => {
  console.error("Process is about to exit with code ",code);
});


bidi.start();
