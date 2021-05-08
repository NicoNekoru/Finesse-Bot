const https = require("https")
class Challonge 
{
	constructor(username, apiKey)
	{
		this.username = username
		this.apiKey = apiKey
		this.host = "api.challonge.com"
		this.href = `https://${username}@${apiKey}.${this.host}`
		this.https = https
	}
	
	get(path)
	{
		let url = `${this.href}/${path}`
		return new Promise(https.get(
			new URL(url), (res) => {
				console.log('statusCode:', res.statusCode);
				console.log('headers:', res.headers); 
				let data = "" 
				res.on('data', (d) => {
					data += d
				});  
				res.on('end', (e) => {
					resolve(JSON.parse(data))
				})
			}).on('error', (e) => {
				reject(e)
			})
		)
	}
}

module.exports = Challonge