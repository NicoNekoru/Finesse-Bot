const Discord = require('discord.js')
exports.run	= async(message, args) => {
	const client = message.client
	const embed = new Discord.MessageEmbed();
	embed.setTitle('**Pinging...**');
	embed.setColor(0xff0000);
	const sent = await message.channel.send(embed);
	embed.setColor(0xF8FF16);
	embed.setTitle('Pong! :ping_pong:');
	embed.setDescription(
		`:heartbeat: ${client.ws.ping}ms\n` +
		`:stopwatch: ${sent.createdTimestamp - message.createdTimestamp}ms`
	);
	embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
	
	return sent.edit(embed);
}
exports.help = {
	name: 'ping',
	aliases: [],
	description: 'Pings the bot.',
}