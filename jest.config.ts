/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

const config: Config = {
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
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'@/(.*)$': '<rootDir>/src',
	},
};

export default createJestConfig(config);
