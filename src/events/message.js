const auth = require("../config.json");
const Discord = require("discord.js")
module.exports = async message => {
	const client = message.client
	if(message.channel.type === "dm" || message.author.bot) return;
	let prefix = auth.prefix || "nysdey is very cool "; 
	if(new RegExp(`^<@!?${client.user.id}>`, 'i').test(message.content)) return message.reply(`My current prefix is \`${prefix}\``)
	if (!message.content.startsWith(prefix)) return;

	let command = message.content.split(prefix)[1].split(' ')[0];
	let args = message.content.replace(new RegExp(`^${prefix}`),"").split(" ").slice(1);
	if (client.commands.has(command)) 
	{
		cmd = client.commands.get(command)
		await cmd.run(message,args)
	} 
	else if (client.aliases.has(command)) 
	{
		cmd = client.commands.get(client.aliases.get(command));
		await cmd.run(message,args)
	}
}