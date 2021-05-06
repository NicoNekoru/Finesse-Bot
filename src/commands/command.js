const Discord = require("discord.js")
class Command 
{
	constructor(client, options)
	{
		this.name = options.name
		this.aliases = options.aliases
		this.description
		this.permissionLevel = options.permissionLevel
		this.run = options.run
		this.Discord = Discord
		this.permissionLevels = {
			"MANAGE_ROLES" : 1,
			"MOVE_MEMBERS" : 2,
			"MUTE_MEMBERS" : 3,
			"DEAFEN_MEMBERS" : 4,
			"VIEW_AUDIT_LOG" : 5,
			"MANAGE_MESSAGES" : 6,
			"MANAGE_CHANNELS" : 7,
			"KICK_MEMBERS" : 8,
			"BAN_MEMBERS" : 9,
			"MANAGE_GUILD" : 10,
			"ADMINISTRATOR" : 11
		}
		message.member.hasPermission("BAN_MEMBERS")
	}
}