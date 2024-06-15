/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

const config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/.vercel/',
		'/.next/',
		'/.prisma/',
		'/.sql/',
	],
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/src/lib/singleton.ts'],
};

// Overrides transformIgnorePatterns of generated values by next-jest
export default async function configFun(...args) {
	const fn = createJestConfig(config);
	const result = await fn(...args);

	result.transformIgnorePatterns = result.transformIgnorePatterns.map(pattern => {
		if (pattern === '/node_modules/') {
			return '/node_modules(?!/file-type|/token-types|/strtok3|/peek-readable)/';
		}

		return pattern;
	});

	return result;
}
