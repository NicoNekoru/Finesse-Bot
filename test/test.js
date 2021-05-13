const fs = require("fs")
const Challonge = require('challonge');
const Discord = require('discord.js');
const CONFIG = require("../config.json")
const Client = new Discord.Client()
const CClient = Challonge.createClient(CONFIG.challonge)
require("../src/events/message")({
	channel: {
		type: 'text',
	},
	client: {
		user: {
			id: 1
		}
	},
	content: 'test',
	author: {
		id: '367526674490720256',
		system: false,
		locale: null,
		username: 'AsianAreAsian',
		bot: false,
		discriminator: '7884',
		avatar: 'e142cb04a62253071f4d0893506cdde0',
		lastMessageID: '839650521219596299',
		lastMessageChannelID: '819315715232104459'
	}
})
Client.commands = new Map();
Client.aliases = new Map();
Client.queue = new Map();
fs.readdirSync('../src/commands/').forEach((files) => {
	if (err) console.error(err);
	files.forEach(f => {
		let props = require(`../src/commands/${f}`);
		Client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			Client.aliases.set(alias, props.help.name);
		});
		console.log(`${props.help.name} loaded at ${new Date()}`)
	});
});
Client.login(CONFIG.discord.token).then(h=>{
	Client.destroy()
})
