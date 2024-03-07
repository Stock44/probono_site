import {type VariantProps} from 'cva';
import {cva} from '@/lib/cva.ts';

const buttonVariants = cva({
	base: 'flex items-center justify-center rounded disabled:cursor-default w-fit',
	variants: {
		size: {
			xs: 'text-xs px-1',
			sm: 'text-sm p-1',
			md: 'p-2',
			lg: 'p-3 text-lg',
			xl: 'p-4 text-xl',
		},
		variant: {
			primary: 'font-bold bg-stone-100 text-stone-950 hover:bg-stone-300 hover:text-stone-800 disabled:bg-stone-500 disabled:text-stone-800',
			secondary: 'font-bold text-stone-200 bg-stone-900 hover:bg-stone-800  border border-stone-700 disabled:text-stone-400 disabled:bg-stone-700',
			outlined: 'border border-stone-700 text-stone-300 hover:bg-stone-900 disabled:border-stone-800 disabled:text-stone-600 disabled:bg-transparent',
			destructive: 'font-bold bg-red-600 text-stone-50 hover:bg-red-500 disabled:bg-stone-700 disabled:text-stone-800',
			text: 'text-stone-300 font-bold',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export default buttonVariants;
