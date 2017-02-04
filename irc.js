const Bidi = require('./bidibot.js');
const config = require('./config.js');
// let slackKey = process.env.Slack_Token;
// let slackName = process.env.Slack_Key;
// let slackChannel = process.env.Slack_Channel;
// let twitchName = process.env.Twitch_Name;
// let twitchKey = process.env.Twitch_Key;
// let twitchChannel=process.env.Twitch_Channel;







let bidi = new Bidi({
	slackKey : config.slackkey,
	slackName : config.slackname ,
	slackChannel: config.slackChannel,
	twitchName : config.twitchname,
	twitchKey: config.twitchkey,
	twitchChannel: config.twitch_channels
})




bidi.start();
