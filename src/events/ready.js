module.exports = client => {
	console.log(`Online in ${client.guilds.cache.size} servers for ${client.users.cache.size} users on ws ${client.ws.gateway}.`);
	console.log(`Ready at ${new Date}`)
	client.user.setActivity('you check in for IFT', {type: 'WATCHING'})
}
