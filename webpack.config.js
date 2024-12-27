module.exports = (env = {}) => {
	// Log the env object for debugging
	console.log('Env passed to Webpack:', env);

	// Extract the actual environment (e.g., 'prod', 'dev') from env
	const environment = typeof env === 'object' && Object.keys(env).length > 0
		? Object.keys(env).find(key => key !== 'WEBPACK_BUNDLE' && key !== 'WEBPACK_BUILD') || 'development'
		: 'development';

	// Log the selected environment for confirmation
	console.log(`Building with environment: ${environment}`);

	try {
		// Dynamically load the corresponding configuration file
		return require(`./webpack.${environment}.config.js`);
	} catch (error) {
		// Provide a helpful error message if the config file is missing
		throw new Error(`Cannot find the configuration file for environment: ${environment}. Make sure './webpack.${environment}.config.js' exists.`);
	}
};
