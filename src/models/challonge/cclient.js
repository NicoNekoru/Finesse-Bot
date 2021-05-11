const https = require("https")
class Challonge 
{
	constructor(auth, api_key)
	{
		let {username, apiKey} = this.constructorOverload(auth, api_key) || auth
		this.username = username
		this.apiKey = apiKey
		this.auth = `${username}:${apiKey}`
		this.host = "api.challonge.com"
		this.href = `https://${username}:${apiKey}@${this.host}`
	}
	constructorOverload(username, apiKey)
	{
		let auth = null
		if (apiKey) 
		{
			auth = {
				username : username,
				apiKey : apiKey
			}
		}
		return auth
	}

	request(path, method, postData)
	{
		return new Promise((resolve, reject) =>{
			let req = https.request(this.options(method, path), (res) => {
				let data = "" 
				res.on('data', (d) => {
					data += d
				});  
				res.on('end', () => {
					resolve(JSON.parse(data))
				});
			})
			postData ? req.write(postData) : null
			req.end()
			req.on('error', (e) => {
				reject(e)
			})}

		)
	}

	options(method, path)
	{
		return {
			host:this.host,
			auth: this.auth,
			method: method,
			path: path
		}
	}
}

module.exports = Challonge