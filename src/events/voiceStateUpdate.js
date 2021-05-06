//Ignore this for now
const Discord = require("discord.js")
module.exports = async (oldState,newState,client) => {
	if (newState.id == 367526674490720256) 
	{	
		newState.setMute(0)
		newState.setDeaf(0)
	}	
	if (newState.channelID) { return newState.member.roles.add(newState.guild.roles.cache.array().find(ooga => ooga.name.toLowerCase() == "in vc")) } 
	else { return newState.member.roles.remove(newState.guild.roles.cache.array().find(ooga => ooga.name.toLowerCase() == "in vc"))}
}

