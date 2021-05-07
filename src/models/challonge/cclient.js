const https = require("https")
class Challonge 
{
	constructor(username, apiKey)
	{
		this.username = username
		this.apiKey = apiKey
		this.host = "api.challonge.com"
		this.href = `https://${username}@${apiKey}.${this.host}`
		this.URL = new URL(this.href)
		this.https = https
	}
}

module.exports = Challonge