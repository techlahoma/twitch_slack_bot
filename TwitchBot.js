const tmi = require('tmi.js');

class TwitchBot {
    constructor(settings, relay) {
        this.twitchBotSettings = {
            options: { debug: true },
            connection: { reconnect: true },
            identity: {
                username: settings.twitchName,
                password: settings.twitchKey
            },
            channels: [
                settings.twitchChannel
            ]
        };

        this.bot = new tmi.client(this.twitchBotSettings);
        this.relay = relay;

        this.relay.createBot(this.bot, 'twitch');
    }

    setup() {
        let twitchBot = this.bot;
        
        twitchBot.connect();

        twitchBot.on('chat', (channel, user, message, self) => {
            console.log('twitch user is chatting...');
            if (self !== true) {
                this.relay.sendMessage(user.username, message, 'slack');
            }
        });
    }
}

module.exports = TwitchBot;