const fs = require("fs")
const path = require("path")
const Challonge = require('challonge');
const Discord = require('discord.js');
const CONFIG = require("./config.json")
const Client = new Discord.Client()
const CClient = Challonge.createClient(CONFIG.challonge)
Client.login(CONFIG.discord.token)
require(`./eventloader.js`)(Client, CClient)
Client.commands = new Map();
Client.aliases = new Map();
Client.queue = new Map();
Client.CClient = CClient
fs.readdir(path.resolve('./src/commands/'), (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		let command = require(`./commands/${f}`);
		let props = new command(Client, CClient)
		Client.commands.set(props.name, props);
		(props.aliases || ['']).forEach(alias => {
			Client.aliases.set(alias, props.name);
		});
		console.log(`${props.name} loaded at ${new Date()}`)
	});
});