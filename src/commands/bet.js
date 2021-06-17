const Command = require("../models/commands")
module.exports = class matchReport extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : 'bet',
			description : 'use this to bet on grands',
			aliases : [""],
			usage : "bet [1|2]"
		})
	}
	async run(message, args) {
		if (!message.client.betting) return message.reply("betting isn't open yet!")
		const userList = require("../models/competitors.json")
		if (!userList[message.author.id]) return message.reply("you can't bet if you didn't compete!")
		const authorChallonge = userList[message.author.id].challongeInfo.participant.id
		if (!authorChallonge) return message.reply("you can't bet if you didn't compete!")
		let authorScores
		let authorSum
		await this.cclient.matches.index(authorChallonge).then(userMatches => {
			authorScores = userMatches.map(h => {
				let authorPlayer = authorChallonge == h.match.player1_id ? 0 : 1
				return h.match.scores_csv.split("-")[authorPlayer]
			})
		})
		authorSum = authorScores.reduce((a,b)=>{Number(a)+Number(b)},0)
		switch (args[0])
		{
			case '1':
			case '2':
				message.react('✅')
				return message.client.bets[message.author.id] = {score : authorSum, bet : args[0]}
			default:
				return message.reply("invalid syntax, the correct syntax is `bet [1|2]`")
		}
	}
}
