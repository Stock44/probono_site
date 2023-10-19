import type {Config} from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';

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
	],
};
export default config;
