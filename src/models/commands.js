const Discord = require("discord.js")
const Challonge = require("../models/challonge/cclient")
class Command 
{
	constructor(client, cclient, options)
	{
		this.name = options.name
		this.aliases = options.aliases || ['']
		this.description = options.description
		this.requesite = options.requesite || 0
		this.usage = options.usage || `${this.name}`
		this.Discord = Discord
		this.Challonge = Challonge
		this.client = client
		this.cclient = cclient
		// client.api.applications(client.user.id).commands.post({data: {
		// 	name: this.name,
		// 	description: this.description
		// }})
		// coming soon maybe
	}

	static checkPermissions(message)
	{
		let permissionLevels = {
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
		return Math.max(Object.keys(permissionLevels).map(perm=>{
			return message.member.hasPermission(perm) && permissionLevels[perm]
		})) || 0
	}

	run(message, args)
	{
		console.error(`${this.name} has no run function`)
	}
}
module.exports = Command
