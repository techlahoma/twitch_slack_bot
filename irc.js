const Bot = require('slackbots');
const tmi = require('tmi.js');
const config = require('./config.js');

const slackname = config.slackname
const slackkey = config.slackkey;
const slackChannel = config.slackChannel;
const twitchname =config.twitchname;
const twitchkey = config.twitchkey;
const twitch_channels = config.twitch_channels;


let _slackBotSettings = {};
_slackBotSettings.token= slackkey;
_slackBotSettings.name= slackname;


let _twitchBotSettings = {};

_twitchBotSettings.options = {
	debug:true
};

_twitchBotSettings.connection = {
	reconnect:true
}

_twitchBotSettings.identity = {
	username:twitchname,
	password:twitchkey
};

_twitchBotSettings.channels= twitch_channels;


//Slack bot and settings
let bot = new Bot(_slackBotSettings);


bot.on('start', function() {
	console.log('slack bot channel is,'+ slackChannel);
    bot.postMessageToChannel(slackChannel, 'Hello channel! Oh wait... nevermind...');
});


bot.on('message', function(message){
	console.log(message);
})


// Twitch client bot and settings
let client = new tmi.client(_twitchBotSettings);
client.connect();

client.on('connected', function(){
	console.log('twitch connection has been established');
})


client.on('chat', function(channel, user, message, self){
	console.log(user.username+' said.. sent a message.... '+ message);
	twitchToSlack(user.username,message);
})




function twitchToSlack(username,message){
	if(username && message){
		let _string = "On Twitch, *" + username + "* said: \n>>>" + message;
		bot.postMessageToChannel(slackChannel, _string)
	}
}


function slackToTwitch(username,message){
	if(username && message){
		let _string = "On Slack, " + username + " said: " + message;
		bot.postMessageToChannel(twitch_channels,_string)
	}
}

