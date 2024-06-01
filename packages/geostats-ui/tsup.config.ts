import {defineConfig} from 'tsup';

export default defineConfig(options => ({
	entry: ['src/**/*.tsx', 'src/**/*.ts'],
	format: ['esm'],
	dts: true,
	sourcemap: true,
	external: ['react'],
	...options,
}));
