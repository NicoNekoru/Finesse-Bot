const Command = require("../models/commands")
module.exports = class matchReport extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : 'open',
			description : 'use this to open certain events in ift',
			aliases : ["o"],
			usage : "open [event name]",
			requesite : 0
		})
	}
	async run(message, args) {
		if (!message.member.hasPermission("BAN_MEMBERS")) return
		args = args.join(" ")
		if(/match.?report/.test(args))
		{
			message.reply("match reporting is open")
			return message.client.matchReporting = true
		}
				
		if(/bet/.test(args))
		{
			message.reply("betting is open")
			return message.client.betting = true
		}
	}
}
