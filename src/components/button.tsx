import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {type VariantProps, cva} from '@/lib/cva.ts';

const buttonVariant = cva({
	base: 'flex items-center justify-center rounded',
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'p-1',
			lg: 'p-2 text-lg',
			xl: 'p-2 text-xl',
		},
		variant: {
			primary: 'font-bold',
			secondary: 'font-bold',
			outlined: 'border border-stone-800',
			text: '',
		},
		isDisabled: {
			true: 'hover:cursor-not-allowed',
			false: '',
		},
	},
	compoundVariants: [
		{
			variant: 'primary',
			isDisabled: false,
			class: 'bg-stone-50 text-stone-950 hover:bg-stone-300 hover:text-stone-800',
		},
		{
			variant: 'primary',
			isDisabled: true,
			class: 'bg-stone-500 text-stone-800',
		},
		{
			variant: 'secondary',
			isDisabled: false,
			class: 'text-stone-300 bg-stone-800 hover:bg-stone-700',
		},
		{
			variant: 'secondary',
			isDisabled: true,
			class: 'text-stone-400 bg-stone-700',
		},
		{
			variant: 'outlined',
			isDisabled: false,
			class: 'text-stone-300 hover:bg-stone-900',
		},
		{
			variant: 'outlined',
			isDisabled: true,
			class: 'text-stone-600',
		},
		{
			variant: 'text',
			isDisabled: false,
			class: 'text-stone-300',
		},
		{
			variant: 'text',
			isDisabled: true,
			class: 'text-stone-300',
		},
	],
	defaultVariants: {
		isDisabled: false,
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
