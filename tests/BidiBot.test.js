const chai = require('chai');
const sinon = require('sinon');
const logger = require('winston');
const BidiBot = require('../BidiBot');
const SlackBot = require('../SlackBot');
const Relay = require('../Relay');
const SlackStub = require('./stubs/slack.stub');
const ClientStub = require('./stubs/client.stub');
const goodJSON = require('./fixtures/goodSlack.config.js');
const badJSON = require('./fixtures/badSlack.config.js');


chai.should();

describe('SlackBot', () => {

	const sandbox = sinon.sandbox.create({
		useFakeTimers: false,
		useFakeServer: false
	});

	

	beforeEach(() => {
		this.infoStub = sandbox.stub(logger,'info');
		this.debugStub = sandbox.stub(logger,'debug');
		this.errorStub = sandbox.stub(logger,'error');

	})



	afterEach(() => {
		sandbox.restore();
	})



	it('should fail to create a bot without full configurations', (config = badJSON, relay =Relay) => {
		let bot = new BidiBot(config);

		chai.assert.isNotOk(bot,"This will pass, if the bot fails to load because it's missing twitch settings");
	})

	it('should create a new bot if it recieves full configurations', (config = goodJSON, relay =Relay) => {
		let bot = new BidiBot(config);

		chai.assert.isOk(bot.isObject,"This will pass, if the bot fails to load because it's missing twitch settings");
	})

})

