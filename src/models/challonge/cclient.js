const https = require("https")
class Challonge 
{
	constructor(auth)
	{
		let {username, apiKey, tournamentID} = auth
		this.username = username
		this.apiKey = apiKey
		this.tournamentID = tournamentID
		this.auth = `${username}:${apiKey}`
		this.host = "api.challonge.com"
		this.href = `https://${username}:${apiKey}@${this.host}`
	}

	request(path, method, urlParams, postData)
	{
		return new Promise((resolve, reject) =>{
			let req = https.request(this.options(method, path, urlParams), (res) => {
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

	options(method, path, urlParams)
	{
		return {
			host:this.host,
			auth: this.auth,
			method: method,
			path: path,
			searchParams: new URLSearchParams(urlParams)
		}
	}

	matches = {
		index: (participant_id, state) => {
			let path = `/v1/tournaments/${this.tournamentID}/matches.json`
			let params = {
				participant_id : participant_id,
				state : state
			}
			// path += participant_id ? `?participant_id=${participant_id}` : ""
			// path += state ? `?state=${state}` : ""
			return this.request(path,"GET",params)
		},
		update: (match_id, match_info) => {
			let path = `/v1/tournaments/${this.tournamentID}/matches.json`
			let params = {
				match_id : match_id,
				match_info : match_info
			}
			return this.request(path,"PUT",params)
		}
	}
}

module.exports = Challonge
