const Bot = require('slackbots');
const tmi = require('tmi.js');
const config = require('./config.js');

const slackname = config.slackname
const slackkey = config.slackkey;
const slackChannel = config.slackChannel;
const twitchname =config.twitchname;
const twitchkey = config.twitchkey;
const twitch_channels = config.twitch_channels;


let slackusers = {};	
let slackchannels = {};
let twitchusers = {};


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
    users = bot.users.filter(user=> user.name != bot.name);
    channels = bot.channels;
});



bot.on('message', function(message){
	if(message.channel){
	let channel = channels.map(x => x.id).indexOf(message.channel);
			if(channels[channel].name == slackChannel){
			let user = users.map(x => {
					return x.id;
				}).indexOf(message.user);

				if(message.type == "message" && message.text && user != -1){
					slackToTwitch(users[user].name,message.text);		
				}
		}
	}
})


// Twitch client bot and settings
let client = new tmi.client(_twitchBotSettings);
client.connect();

client.on('connected', function(){
	console.log('twitch bot has started!');
})


client.on('chat', function(channel, user, message, self){
	if(self !=true){
		twitchToSlack(user.username,message);
	}
})



function twitchToSlack(username,message){
	if(username && message){
		let _string ="On twitch, user "+username+" said "+message;
		bot.postMessageToChannel(slackChannel,_string)
	}
}


function slackToTwitch(username,message){

	if(username && message){
		let _string ="On slack, user "+username+" said "+message;
		twitch_channels.foreach
		client.action(twitch_channels[0],_string);
	}
}

