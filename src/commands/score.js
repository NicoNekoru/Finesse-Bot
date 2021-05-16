const Command = require("../models/commands")
module.exports = class matchReport extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : 'score',
			description : 'use this to check your available score to bet',
			aliases : ["stats"],
			usage : "score"
		})
	}
	async run(message, args) {
		args = args.join("")
		if (!message.client.betting) return message.reply("betting isn't open yet!")

		const userList = require("../models/competitors.json")
		const authorChallonge = userList[message.author.id].challongeInfo.id
		if (!authorChallonge) return message.reply("you don't have a score if you didn't compete!")
		let authorScores
		await this.cclient.matches.index(authorChallonge).then(userMatches => {
			authorScores = userMatches.map(h => {
				let authorPlayer = authorChallonge == h.match.player1_id ? 0 : 1
				return h.match.scores_csv.split("-")[authorPlayer]
			})
		})
		let authorSum = authorScores.reduce((a,b)=>{return a+b},0)
		return message.reply(`your score is ${authorSum}`)
	}
}