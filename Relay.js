class Relay {
    constructor(slackChannel, twitchChannel) {
        this.slackBot;
        this.twitchBot;
        this.slackChannel = slackChannel;
        this.twitchChannel = twitchChannel;
    }

    createBot(bot, type) {
        switch (type.toLowerCase()) {
        case 'slack':
            this.slackBot = bot;
            break;
        case 'twitch':
            this.twitchBot = bot;
            break;
        default:
            console.error('Unsupported bot type. Only Slack and Twitch bots are allowed');
        }
    }

    sendMessage(user, message, destination) {
        console.log('Relay has received message: ', message);
        console.log('From:', user);
        console.log('To:', destination);

        switch (destination.toLowerCase()) {
        case 'slack':
            message = `On Twitch, *${ user }* said: \n>>>${ message }`;
            this.slackBot.postMessageToChannel(this.slackChannel, message);
            break;
        case 'twitch':
            message = `On Slack, ${ user } said: ${ message }`;
            this.twitchBot.action(this.twitchChannel, message);
            break;
        default:
            console.error('Trying to send message to unknown destination.');
        }
    }
}

module.exports = Relay;
