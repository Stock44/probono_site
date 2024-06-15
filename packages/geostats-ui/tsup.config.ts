import {defineConfig} from 'tsup';
import svgr from 'esbuild-plugin-svgr';
import jsx from '@svgr/plugin-jsx';

export default defineConfig(options => ({
	banner: {
		js: `"use client"`,
	},
	entry: ['src/**/*.tsx', 'src/**/*.ts'],
	format: ['esm'],
	dts: true,
	sourcemap: true,
	external: ['react', 'react-dom'],
	esbuildPlugins: [svgr({svgo: false, plugins: [jsx]})],
	...options,
}));
