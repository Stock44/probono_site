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
		'@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/src/lib/singleton.ts'],
};

// Overrides transformIgnorePatterns of generated values by next-jest
// @ts-expect-error unknown type of args
export default async function configFun(...args) {
	const fn = createJestConfig(config);
	// @ts-expect-error unknown type of args
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = await fn(...args);

	// @ts-expect-error won't be undefined
	result.transformIgnorePatterns = result.transformIgnorePatterns.map(pattern => {
		if (pattern === '/node_modules/') {
			return '/node_modules(?!/file-type|/token-types|/strtok3|/peek-readable)/';
		}

		return pattern;
	});

	return result;
}
// Export default createJestConfig(config);
