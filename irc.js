const Bidi = require('./bidibot.js');


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


bidi.start();
