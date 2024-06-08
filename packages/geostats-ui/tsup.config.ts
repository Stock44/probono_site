import {defineConfig} from 'tsup';

export default defineConfig(options => ({
	banner: {
		js: `"use client"`,
	},
	entry: ['src/**/*.tsx', 'src/**/*.ts'],
	format: ['esm'],
	dts: true,
	sourcemap: true,
	external: ['react', 'react-dom'],
	...options,
}));
