import {type VariantProps} from 'cva';
import {cva} from '@/cva.ts';

export const buttonVariants = cva({
	base: 'flex size-fit items-center gap-1 truncate rounded fill-current font-bold transition-colors disabled:cursor-default',
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'p-1 text-sm',
			md: 'p-2',
			lg: 'p-3 text-lg',
			xl: 'p-4 text-xl',
		},
		variant: {
			primary:
				'bg-stone-100 text-stone-950 hover:bg-stone-300 hover:text-stone-800 disabled:bg-stone-500 disabled:text-stone-800',
			secondary:
				'border border-stone-700 bg-stone-900  text-stone-200 hover:bg-stone-800 disabled:bg-stone-700 disabled:text-stone-800 ',
			outlined:
				'border border-stone-700 text-stone-300 hover:bg-stone-900 disabled:border-stone-800 disabled:bg-transparent disabled:text-stone-600',
			destructive:
				'border border-red-600 bg-red-600 text-stone-50 hover:bg-red-500 disabled:border-stone-700 disabled:bg-stone-700 disabled:text-stone-800',
			text: 'text-stone-300',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
