const Command = require("../models/commands")
module.exports = class ping extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : 'ping',
			description : 'pings the bot'
		})
	}
	async run(message) {
		const embed = new this.Discord.MessageEmbed();
		embed.setTitle('**Pinging...**');
		embed.setColor(0xff0000);
		const sent = await message.channel.send(embed);
		embed.setColor(0xF8FF16);
		embed.setTitle('Pong! :ping_pong:');
		embed.setDescription(
			`:heartbeat: ${this.client.ws.ping}ms\n` +
			`:stopwatch: ${sent.createdTimestamp - message.createdTimestamp}ms`
		);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		
		return sent.edit(embed);
	}
}