const SlackBot = require('./SlackBot');
const TwitchBot = require('./TwitchBot');
const Relay = require('./Relay');

class BidiBot {
    constructor(settings) {
        this.settings = settings;
    }

    start() {
        const chatRelay = new Relay(this.settings.slackChannel, this.settings.twitchChannel);
        const slackBot = new SlackBot(this.settings, chatRelay);
        const twitchBot = new TwitchBot(this.settings, chatRelay);

        slackBot.setup();
        twitchBot.setup();
    }
}

module.exports = BidiBot;
