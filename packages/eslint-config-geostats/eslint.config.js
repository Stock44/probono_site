import {FlatCompat} from '@eslint/eslintrc';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginSonarJs from 'eslint-plugin-sonarjs';
import pluginSecurity from 'eslint-plugin-security';
import pluginReactRedux from 'eslint-plugin-react-redux';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname, // optional; default: process.cwd()
	resolvePluginsRelativeTo: __dirname, // optional
	recommendedConfig: pluginJs.configs.recommended, // optional unless you're using "eslint:recommended"
	allConfig: pluginJs.configs.all, // optional unless you're using "eslint:all"
});

export default [
	{languageOptions: {globals: globals.browser}},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginUnicorn.configs['flat/recommended'],
	...compat.config(pluginTailwindcss.configs.recommended),
	pluginSecurity.configs.recommended,
	...compat.config(pluginReactRedux.configs.recommended),
	pluginReactConfig,
	...compat.config(pluginSonarJs.configs.recommended),
	...compat.config(pluginReactHooks.configs.recommended),
	...compat.config(pluginImport.configs.recommended),
	...compat.config(pluginImport.configs.typescript),
	eslintPluginPrettierRecommended,
	{
		rules: {
			'unicorn/no-null': 'off',
			'unicorn/prevent-abbreviations': [
				'error',
				{
					replacements: {
						props: false,
						ref: false,
						args: false,
						env: false,
					},
				},
			],
			'react-redux/no-unused-prop-types': 'off', // weird duplicate rule that causes false positives
			'react/react-in-jsx-scope': 'off',
			'import/no-default-export': 'error',
		},
	},
	{
		ignores: ['src/routeTree.gen.ts'],
	},
];
