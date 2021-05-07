const Command = require("../models/commands")
module.exports = class matchReport extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : '', //matchreport, not ready yet
			description : 'use this for reporting matches in ift',
            aliases : ["mr"],
            usage : "matchreport [round] [yourScore-opponentScore] @[opponent]"
		})
	}
	async run(message, args) {
		
	}
}