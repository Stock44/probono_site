import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';

export type ButtonProps = {
	readonly variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
	readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	readonly className?: string;
	readonly children?: ReactNode;
} & AriaButtonOptions<'button'>;

export default forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {variant = 'primary', size = 'md', isDisabled, className, children} = props;
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton(props, buttonRef);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={clsx(
				'rounded text-sm font-bold flex items-center justify-between text-left',
				size === 'xs' && 'text-xs',
				size === 'sm' && 'p-1 text-sm',
				size === 'md' && 'p-1 text-md',
				size === 'lg' && 'p-2 text-lg',
				size === 'xl' && 'p-2 text-xl',
				variant === 'primary' && !isDisabled
          && 'bg-stone-50 text-stone-950 hover:bg-stone-200',
				variant === 'secondary' && !isDisabled
          && 'text-stone-300 hover:bg-stone-800 border border-stone-700',
				variant === 'tertiary' && !isDisabled
          && 'text-stone-300 hover:bg-stone-900',
				variant === 'primary' && isDisabled
					&& 'bg-stone-400 text-stone-700',
				variant === 'secondary' && isDisabled
					&& 'text-stone-300 hover:bg-stone-800 border border-stone-700',
				variant === 'tertiary' && isDisabled
					&& 'text-stone-500',
				isDisabled && 'hover:cursor-not-allowed',
				className,
			)}
		>{children}</button>
	);
});
