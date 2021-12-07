module.exports = {
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
	],
	moduleNameMapper: {
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
		'^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
		'^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
		'<rootDir>/__mocks__/fileMock.js',
		'^~/styles/(.*)$': '<rootDir>/styles/$1',
		'^~/components/(.*)$': '<rootDir>/components/$1',
		'^~/controllers/(.*)$': '<rootDir>/controllers/$1',
		'^~/hooks/(.*)$': '<rootDir>/hooks/$1',
		'^~/engine/(.*)$': '<rootDir>/engine/$1',
		'^~/public/(.*)$': '<rootDir>/public/$1',
		'^~/utils/(.*)$': '<rootDir>/utils/$1',
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	testEnvironment: 'jsdom',
	transformIgnorePatterns: [
		'/node_modules/',
		'^.+\\.module\\.(css|sass|scss)$',
	],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
