const common = require('./jest-common.config.js');

module.exports = {
	...common,
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': [
			'ts-jest', {},
		],
	},
};
