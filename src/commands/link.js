const Command = require("../models/commands")
const fs = require('fs');
const path = require("path")
module.exports = class help extends Command 
{
	constructor(client, cclient)
	{
		super(client, cclient, {
			name: 'link',
			aliases: [''],
			description: 'Links your discord account, challonge account, and tetrio account',
			usage: 'link [challonge username] [tetrio username]'
		})
	}
	async run(message, args)
	{
        switch (args.length) {
            case 2: {
                const USERLIST = require("../models/competitors.json");
                const USER = message.author;
                const CHALLONGE_USERNAME = args[0]
                const TETRIO_USERNAME = args[1]
                let tUsers = await this.cclient.participants.index()
                let cUser = tUsers.find(user=>user.participant.username.toLowerCase()==CHALLONGE_USERNAME.toLowerCase())
                if (!cUser) return message.reply(`there is nobody named '${CHALLONGE_USERNAME}' in this tournament! Before linking your accounts make sure to register for the tournament first at ${this.cclient.tournamentUrl}`);
                if ( USERLIST[USER.id] ) return message.reply("you have already linked your account! If you think there is an error and wish to change it use the unlink command or link without any arguments!");
                USERLIST[USER.id] = {
                    challongeName : CHALLONGE_USERNAME,
                    tetrioName : TETRIO_USERNAME,
                    challongeInfo : cUser,
                    discordUser : USER.username
                };
				message.react('✅')
                return fs.writeFileSync(path.join(__dirname,"../models/competitors.json"), JSON.stringify(USERLIST));
            }
            case 1: {
                const USERLIST = require("../models/competitors.json");
                const USER = message.author;
                const CHALLONGE_USERNAME = args[0]
                const TETRIO_USERNAME = args[0]
                let tUsers = await this.cclient.participants.index()
                let cUser = tUsers.find(user=>user.participant.username.toLowerCase()==CHALLONGE_USERNAME.toLowerCase())
                if (!cUser) return message.reply(`there is nobody named '${CHALLONGE_USERNAME}' in this tournament! Before linking your accounts make sure to register for the tournament first at ${this.cclient.tournamentUrl}`);
                if ( USERLIST[USER.id] ) return message.reply("you have already linked your account! If you think there is an error and wish to change it use the unlink command or link without any arguments!");
                USERLIST[USER.id] = {
                    challongeName : CHALLONGE_USERNAME,
                    tetrioName : TETRIO_USERNAME,
                    challongeInfo : cUser,
                    discordUser : USER.username
                };
				message.react('✅')
                return fs.writeFileSync(path.join(__dirname,"../models/competitors.json"), JSON.stringify(USERLIST));

            }
            case 0: {
                const USERLIST = require("../models/competitors.json");
                const USER = message.author;
                const USERINFO = USERLIST[USER.id]
                if ( !USERINFO ) return message.reply("you have not linked an account yet! Link your accounts with `link [challonge username] [tetrio username]`");
                return message.reply(`you have linked your account to the ${USERINFO.challongeName} challonge account`);
            }
            default:
               return message.reply("the syntax of the command is incorrect. The correct syntax is `link [challonge username] [tetrio username]`");
        }
    }
}
