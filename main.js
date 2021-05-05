const Challonge = require('challonge');
const Discord = require('discord.js');
const CONFIG = require("./config.json")
const Client = new Discord.Client()
const CClient = Challonge.createClient(CONFIG.challonge)
Client.login(CONFIG.discord.token)
require(`./eventloader.js`)(Client, CClient)
client.commands = new Map();
client.aliases = new Map();
client.queue = new Map();
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		let props = require(`./commands/${f}`);
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
		console.log(`${props.help.name} loaded at ${new Date()}`)
	});
});

client.reload = (client, command) => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			let cmd = require(`./commands/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.help.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};