const Command = require("../models/commands")
module.exports = class matchReport extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : 'close',
			description : 'use this to close certain events in ift',
			aliases : ["c"],
			usage : "close [event name]",
            requesite : 10
		})
	}
	async run(message, args) {
        args = args.join(" ")
        switch (true) {
            case /match.?report/.test(args):
                return message.client.matchReporting = false
            case /bet/.test(args):
                return message.client.betting = false
            default:
                break;
        }
	}
}