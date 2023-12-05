import type {Config} from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindcss from 'tailwindcss/plugin';

/* eslint-disable @typescript-eslint/naming-convention */
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			keyframes: {
				'spin-path': {
					'0%': {
						'stroke-dasharray': '1, 150',
						'stroke-dashoffset': '0',
					},
					'50%': {
						'stroke-dasharray': '90, 150',
						'stroke-dashoffset': '-35',
					},
					'100%': {
						'stroke-dasharray': '90, 150',
						'stroke-dashoffset': '-124',
					},
				},
			},
			animation: {
				'spin-path': 'spin-path 1.5s ease-in-out infinite;',
			},
			strokeWidth: {
				3: '6px',
			},
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
/* eslint-enable @typescript-eslint/naming-convention */
export default config;
