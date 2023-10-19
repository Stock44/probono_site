import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';

export type ButtonProps = {
	readonly variant?: 'primary' | 'secondary' | 'tertiary';
	readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	readonly className?: string;
	readonly children?: ReactNode;
} & AriaButtonOptions<'button'>;

export default forwardRef((
	{
		variant = 'primary',
		size = 'md',
		className,
		children,
		...props
	}: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>,
) => {
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton(props, buttonRef);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={clsx(
				'rounded text-sm font-bold flex items-center',
				size === 'xs' && 'text-xs',
				size === 'sm' && 'p-1 text-sm',
				size === 'md' && 'p-1 text-md',
				size === 'lg' && 'p-2 text-lg',
				size === 'xl' && 'p-2 text-xl',
				variant === 'primary'
          && 'bg-stone-50 text-stone-950 hover:bg-stone-200',
				variant === 'secondary'
          && 'text-stone-300 hover:bg-stone-800 border border-stone-700',
				variant === 'tertiary'
          && 'bg-stone-950 text-stone-300 hover:bg-stone-900',
				className,
			)}
		>{children}</button>
	);
});
