import type {Config} from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindcss from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			transitionProperty: {
				height: 'max-height',
			},
			borderWidth: {
				1: '1px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		tailwindScrollbar({nocompatible: true}),
		tailwindcss(({addBase}) => {
			addBase({
				'[type="search"]::-webkit-search-decoration': {display: 'none'},
				'[type="search"]::-webkit-search-cancel-button': {display: 'none'},
				'[type="search"]::-webkit-search-results-button': {display: 'none'},
				'[type="search"]::-webkit-search-results-decoration': {display: 'none'},
			});
		}),
	],
};
export default config;
