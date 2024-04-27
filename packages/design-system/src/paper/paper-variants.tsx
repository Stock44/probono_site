import {type VariantProps} from 'cva';
import {cva} from '@/lib/cva.ts';

const paperVariants = cva({
	base: 'border border-stone-800 backdrop-blur bg-stone-900/5 transition-all rounded text-stone-300',
	variants: {
		hoverEffect: {
			true: 'hover:glow-sm hover:scale-[101%] hover:border-stone-700 duration-500',
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
