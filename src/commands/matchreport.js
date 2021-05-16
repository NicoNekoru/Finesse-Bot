const Command = require("../models/commands")
module.exports = class matchReport extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name : 'matchreport',
			description : 'use this for reporting matches in ift',
			aliases : ["mr"],
			usage : "matchreport [round] [yourScore-opponentScore] @[opponent]"
		})
	}
	async run(message, args) {
		if (!message.client.matchReporting) return message.reply("match reporting isn't ready yet!")
		if (!message.mentions) return message.reply("you didn't mention anyone!")
		const userList = require("../models/competitors.json")
		let gameNumber = args[0]
		let score = args[1]
		let reporter = message.author
		let reportee = message.mentions.members.first()
		let cReporter = userList[reporter].challongeInfo.id
		let cReportee = userList[reportee].challongeInfo.id
		let game = this.cclient.matches.index()[gameNumber]
		var scoreArr = score.split("-")
		if (scoreArr.length != 2 || scoreArr.reduce((a,h)=>{return a==h}) || scoreArr.find(h=>typeof h=='string')) return message.reply("invalid score syntax, the correct syntax is [yourScore-opponentScore] and both scores have too be different!")
		const gameId = game.id
		var player1, player2;

		if (game.player1_id == cReporter && game.player2_id == cReportee) 
		{
			player1 = reporter
			player2 = reportee
		}
		else if (game.player1_id == cReportee && game.player2_id == cReporter)
		{
			player1 = reportee
			player2 = reporter
			score = [...score].reverse().join("");
		}
 		else return message.reply("you cannot report a match you and/or your mention are not in!")
		
		var reports = require("../models/reports.json")
		var report = reports[gameId]
		var winner = scoreArr.indexOf(Math.max(...arr)) == 0 ? game.player1_id : game.player2_id
		if (report[reportee.id] && report[reporter.id])
		{
			return message.reply("this match has already been confirmed or has a conflict, contact staff if you think there has been an error")
		}
		if (!report)
		{
			report[reporter.id] = score
			report.conflict = false
			this.cclient.matches.update(gameId, {scores_csv:score, winner_id:winner})
			message.reply("I successfully updated the match in challonge!")
		}
		else if (report[reporter.id] && !report[reportee.id])
		{
			this.cclient.matches.update(gameId, {scores_csv:score, winner_id:winner})
			message.reply("I successfully reupdated the match in challonge!")
		}
		else if (report[reportee.id] && !report[reporter.id])
		{
			if (report[reportee.id] == score) 
			{
				message.reply("the match report has been confirmed!")
			}
			else
			{
				this.cclient.matches.update(gameId, {scores_csv:"", winner_id:""})
				message.reply("there has been a conflict")
				report.conflict = true
				message.guild.channels.cache.get("840823232055083018").send(`Conflict between <@${reporter.id}> and <@${reportee.id}>`)
			}
			report[reporter.id] = score
		}
		reports[gameId] = report
		return fs.writeFileSync(path.resolve(__dirname,"../models/reports.json"), JSON.stringify(reports));
	}
}
