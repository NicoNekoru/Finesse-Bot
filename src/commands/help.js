const Command = require("../models/commands")
module.exports = class help extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name: 'help',
			aliases: ['?','h'],
			description: 'Brings up help menu with no arguments and gets information about the specified command with arguments',
			usage: 'help ?[page number|command name]'
		})
	}
	async run(message, args)
	{
		let helpcommand = [];
		for(let i = 0; i < Array.from(this.client.commands.keys()).length; i += 10) 
		{
			helpcommand.push(Array.from(this.client.commands.keys()).slice(i, i+10))
		}
		if (!args[0])
		{
			const embed = new this.Discord.MessageEmbed();
			embed.setColor(0xF8FF16);
			//embed.attachFiles(File)
			embed.setAuthor(`You want help, here take it: (Page 1/${helpcommand.length})`, message.author.displayAvatarURL())
			embed.setDescription(helpcommand[0].join("\n"))
			embed.setFooter("For more information on a single command use help [command name]");
			return message.channel.send(embed);
		}
		else if (this.client.commands.get(args[0]))
		{
			let help = this.client.commands.get(args[0].toLowerCase())
			const embed = new this.Discord.MessageEmbed();
			embed.setColor(0xF8FF16);
			embed.setTitle(`**${help.name.charAt(0).toUpperCase() + help.name.slice(1)}**:`);
			//embed.attachFiles(File)
			embed.setDescription(
				`Aliases: ${help.aliases.join(", ")}\n`+
				`Usage: ${help.usage}\n`+
				`${help.description}`
			)
			return message.channel.send(embed);
		}
		else if (this.client.aliases.get(args[0].toLowerCase()))
		{
			let help = this.client.commands.get(this.client.aliases.get(message.content.split("!")[1].split(" ")[1].toLowerCase())).help
			const embed = new this.Discord.MessageEmbed();
			embed.setColor(0xF8FF16);
			embed.setTitle(`**${help.name.charAt(0).toUpperCase() + help.name.slice(1)}**:`);
			//embed.attachFiles(File)
			embed.setDescription(
				`Aliases: ${help.aliases.join(", ")}\n`+
				`Usage: ${help.usage}\n`+
				`${help.description}`
			)
			return message.channel.send(embed);
		}
		else if (parseInt(args[0]) <= helpcommand.length)
		{
			const embed = new this.Discord.MessageEmbed();
			embed.setColor(0xF8FF16);
			//embed.attachFiles(File)
			embed.setAuthor(`You want help, here take it: (Page ${args[1]}/${helpcommand.length})`, 'https://images-ext-2.discordapp.net/external/rRDS9iQtoKUXGMUv4rXxDHYA0fGM69fS8EYoq9n8kOw/https/i.imgur.com/KbLY4go.png', '')
			embed.setDescription(helpcommand[args[1] - 1].join("\n"))
			embed.setFooter("For more information on a single command use nut!help [command name]");
			return message.channel.send(embed);
		}
		else
		{
			return message.reply("That is not a command");
		}
	}
}
