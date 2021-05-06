module.exports = {
	apps : [{
		name: "ift : b",
		script: './src/main.js',
		watch: '.',
		max_restarts: 10,
		env: {
			NODE_ENV: "development",
		},
		env_production: {
			NODE_ENV: "production",
		}
	}]
};
