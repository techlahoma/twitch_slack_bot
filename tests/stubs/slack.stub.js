const EventEmitter = require('events');


class SlackStub extends EventEmitter{
	getChannels() {
		return {
			channels: ['general','twitch-chat']
		}
	}
}




module.exports = SlackStub;