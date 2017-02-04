const Bot = require('slackbots');
const tmi = require('tmi.js');
		
let slackusers = {};	
let slackchannels = {};
let twitchusers = {};

let bidi = function Constructor(args){
	if(args){
		this.settings =args;
	}
}

bidi.prototype.start = function(){
	let settings = this.settings;
	let _slackBotSettings = {};
	_slackBotSettings.token= settings.slackKey;
	_slackBotSettings.name= settings.slackName;
	let _twitchBotSettings = {};
	_twitchBotSettings.options = {
		debug:true
	};
	_twitchBotSettings.connection = {
		reconnect:true
	}
	_twitchBotSettings.identity = {
		username:settings.twitchName,
		password:settings.twitchKey
	};
	_twitchBotSettings.channels = [];
	_twitchBotSettings.channels.push(settings.twitchChannels);

	let bot = new Bot(_slackBotSettings);

	bot.on('start', function() {
		console.log('slack bot has started')
		users = bot.users.filter(user=> user.name != bot.name);
		channels = bot.channels;
	});

	bot.on('message', function(message){
		if(message.channel){
			let channel = channels.map(x => x.id).indexOf(message.channel);
				if(channels[channel].name == settings.slackChannel){
					let user = users.map(x => {
						return x.id;
					}).indexOf(message.user);
					if(message.type == "message" && message.text && user != -1){
							let string = slackToTwitch(users[user].name,message.text);	
							console.log('the slack to twitch string is... ', string);
							client.action(settings.twitchChannels,string);	
					}
				}
		}
	})


	let client = new tmi.client(_twitchBotSettings);
	
	client.connect();
			
	client.on('connected', function(){
		console.log('twitch bot has started!');
	})

	client.on('chat', function(channel, user, message, self){
		console.log('twitch user is chatting...');
		if(self !=true){
			let string = twitchToSlack(user.username,message);
			bot.postMessageToChannel(settings.slackChannel,string);	
		}
	})

	function twitchToSlack(username,message){

		if(username && message){
			console.log("twitch to slack settings", settings);
			let _string ="On twitch, user "+username+" said "+message;
			return _string;
		}	
	}

	function slackToTwitch(username,message){
		if(username && message){
			console.log('slack to twitch settings', settings);
			let _string ="On slack, user "+username+" said "+message;
			return _string;
		}
	}
}






module.exports = bidi;