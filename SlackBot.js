const Bot = require('slackbots');

class SlackBot {
    constructor(settings, relay) {
        this.slackBotSettings = {
            token: settings.slackKey,
            name: settings.slackName
        };

        this.channel = settings.slackChannel;

        this.bot = new Bot(this.slackBotSettings);
        this.relay = relay;
        this.relay.createBot(this.bot, 'slack');
    }

    // Setup Slackbot actions
    setup() {
        let slackBot = this.bot;
        let botIds = [];
        let channelId;
        
        slackBot.on('start', () => {
            console.log('SlackBot started!');

            // Get a list of all the bot ids in Slack.
            // TODO: make this configurable?
            botIds = slackBot.users
                .filter(user => user.name === slackBot.name || user.name === 'slackbot')
                .map(bot => bot.id);
            console.log('bot ids:', botIds);

            // Get the channel id for the channel we're watching on Slack.
            channelId = slackBot.channels
                .filter(channel => channel.name === this.channel)[0].id;
        });

        slackBot.on('message', (message) => {
            // If the incoming message is from the channel we're watching, is of type "message", 
            // has text and doesn't belong to one of the bot users...
            if (message.channel == channelId && 
                message.type === 'message' &&
                message.user &&
                message.text && botIds.indexOf(message.user) === -1) {

                function getUserNameByID(id)
                {
                    return slackBot.users.filter(user => user.id === id)[0].name;
                }

                function replaceUserNames(messageText)
                {
                    var tagsRegex = /<@\w{9}>/g;
                    var idRegex = /\w{9}/;
                    var tags = messageText.match(tagsRegex);

                    for (var i = 0; i < tags.length; i++)
                    {
                        var tag = tags[i];
                        var id = tag.match(idRegex)[0];
                        var username = getUserNameByID(id);

                        if (username)
                        {
                            messageText = messageText.replace(tag, '@' + username);
                        }
                    }

                    return messageText;
                }

                // Get the user name from the user id.
                let user = getUserNameByID(message.user);

                let messageText = replaceUserNames(message.text);

                // Inform Relay of the message to send to Twitch.
                this.relay.sendMessage(user, messageText, 'twitch');
            }
        });
    }
}

module.exports = SlackBot;
