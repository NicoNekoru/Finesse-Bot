const auth = require("../auth.json");
const Discord = require("discord.js")
module.exports = async message => {
	const client = message.client
	if(message.channel.type === "dm") return;
	if(message.author.bot) return;
	let prefix = auth.prefix || ".";
	if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) return message.reply(`My current prefix is ${prefix}`)

	if (!message.content.startsWith(prefix)) return;

	let command = message.content.split(prefix)[1].split(' ')[0];
	let args = message.content.split(" ");
	let isMod = message.member.hasPermission("ADMINISTRATOR");
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