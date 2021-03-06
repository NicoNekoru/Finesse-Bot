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
		const userList = require("../models/competitors.json")
		if (!userList[message.author.id]) return message.reply("you can't check your score if you didn't link your account! Run the `ift: help link` comand to see more information")
		const authorChallonge = userList[message.author.id].challongeInfo.participant.id
		if (!authorChallonge) return message.reply("you can't check your score if you didn't compete!")
		let authorScores
		let authorSum
		await this.cclient.matches.index(authorChallonge).then(userMatches => {
			authorScores = userMatches.map(h => {
				let authorPlayer = authorChallonge == h.match.player1_id ? 0 : 1
				return h.match.scores_csv.split("-")[authorPlayer]
			})
		})
		authorSum = authorScores.reduce((a,b)=>{return Number(a)+Number(b)},0)
		return message.reply(`your score is ${authorSum}`)
	}
}
