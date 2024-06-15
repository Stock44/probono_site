import {type VariantProps} from 'cva';
import {cva} from '@/cva.ts';

const paperVariants = cva({
	base: 'rounded border border-stone-800 bg-black/40 text-stone-300 backdrop-blur transition-all',
	variants: {
		hoverEffect: {
			true: 'duration-500 hover:scale-[101%] hover:border-stone-700 hover:glow-sm',
			false: '',
		},
		spacing: {
			none: 'p-0',
			xs: 'p-1',
			sm: 'p-2',
			md: 'p-4',
			lg: 'p-8',
			xl: 'p-16',
		},
	},
	defaultVariants: {
		spacing: 'md',
		hoverEffect: false,
	},
});

export type PaperVariantProps = VariantProps<typeof paperVariants>;

export default paperVariants;
