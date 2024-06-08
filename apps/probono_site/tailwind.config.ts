import {type Config} from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindcss from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/geostats-ui/**/*.{js,ts,jsx,tsx,mdx}',
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
				4: '8px',
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
		tailwindcss(({addBase, addUtilities}) => {
			addUtilities({
				'.glow-sm': {
					'box-shadow':
						'0px 0px 32px 8px var(--tw-shadow-color, theme("colors.stone.900"))',
				},
				'.glow': {
					'box-shadow':
						'0px 0px 40px 8px var(--tw-shadow-color, theme("colors.stone.900"))',
				},
				'.glow-lg': {
					'box-shadow':
						'0px 0px 48px 8px var(--tw-shadow-color, theme("colors.stone.800"))',
				},
				'.glow-xl': {
					'box-shadow':
						'0px 0px 56px 8px var(--tw-shadow-color, theme("colors.stone.800"))',
				},
				'.glow-2xl': {
					'box-shadow':
						'0px 0px 64px 8px var(--tw-shadow-color, theme("colors.stone.800"))',
				},
			});
			addBase({
				'[type="search"]::-webkit-search-decoration': {display: 'none'},
				'[type="search"]::-webkit-search-cancel-button': {
					display: 'none',
				},
				'[type="search"]::-webkit-search-results-button': {
					display: 'none',
				},
				'[type="search"]::-webkit-search-results-decoration': {
					display: 'none',
				},
			});
		}),
	],
};
export default config;
