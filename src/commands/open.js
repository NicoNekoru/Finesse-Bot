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
            requesite : 10
		})
	}
	async run(message, args) {
        args = args.join(" ")
        switch (true) {
            case /match.?report/.test(args):
                return message.client.matchReporting = true
            case /bet/.test(args):
                return message.client.betting = true
            default:
                break;
        }
	}
}
