'use client';
import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {type VariantProps, cva} from '@/lib/cva.ts';

const buttonVariant = cva({
	base: 'flex items-center justify-center rounded disabled:cursor-not-allowed',
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'p-1',
			lg: 'p-2 text-lg',
			xl: 'p-2 text-xl',
		},
		variant: {
			primary: 'font-bold bg-stone-50 text-stone-950 hover:bg-stone-300 hover:text-stone-800 disabled:bg-stone-500 disabled:text-stone-800',
			secondary: 'font-bold text-stone-300 bg-stone-800 hover:bg-stone-700 disabled:text-stone-400 disabled:bg-stone-700',
			outlined: 'border border-stone-700 text-stone-300 hover:bg-stone-900 disabled:border-stone-800 disabled:text-stone-600 disabled:bg-transparent',
			text: 'text-stone-300',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
});

export type ButtonProps = {
	readonly children?: ReactNode;
	readonly className?: string;
} & AriaButtonOptions<'button'> & VariantProps<typeof buttonVariant>;

export default forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {children} = props;
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton(props, buttonRef);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={buttonVariant(props)}
		>{children}</button>
	);
});
