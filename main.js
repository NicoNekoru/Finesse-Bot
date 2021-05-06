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
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		let props = require(`./commands/${f}`);
		Client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			Client.aliases.set(alias, props.help.name);
		});
		console.log(`${props.help.name} loaded at ${new Date()}`)
	});
});

Client.reload = (Client, command) => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			let cmd = require(`./commands/${command}`);
			Client.commands.delete(command);
			Client.aliases.forEach((cmd, alias) => {
				if (cmd === command) Client.aliases.delete(alias);
			});
			Client.commands.set(command, cmd);
			cmd.help.aliases.forEach(alias => {
				Client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};