const runEvent = (event) => require(`./events/${event}`);
module.exports = (client, chClient) => {
	client.on('ready', () => runEvent('ready')(client));
	// client.on('voiceStateUpdate', (oldState,newState) => runEvent('voiceStateUpdate')(oldState,newState,client));
	client.on('message', runEvent('message'));
};

