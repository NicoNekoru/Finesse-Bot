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
            // requesite : 10
		})
	}
	async run(message, args) {
		if (!message.member.hasPermission("BAN_MEMBERS")) return
        args = args.join(" ")
        switch (true) {
            case /match.?report/.test(args):
                return message.client.matchReporting = false
            case /bet/.test(args):
				message.client.betting = false
				let h = Object.values(message.client.bets)
				let betOners = h.filter(h=>h.bet == 1).map(j=>{return j.score})
				let betTwoers = h.filter(h=>h.bet == 2).map(j=>{return j.score})
				let betAvg1 = betOners.reduce((a,b)=>{return Number(a) + Number(b)}, 0)/betOners.length || 0
				let betAvg2 = betTwoers.reduce((a,b)=>{return Number(a) + Number(b)}, 0)/betTwoers.length || 0
				message.client.bets = []
				return message.channel.send(`1: ${betAvg1}, 2: ${betAvg2}`)
			default:
                break;
        }
	}
}
