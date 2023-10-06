import React from 'react';
import {Button as BaseButton, type ButtonProps} from '@mui/base';
import clsx from 'clsx';

export const Button = React.forwardRef((
	{
		variant = 'primary',
		className,
		...props
	}: {readonly variant?: 'primary' | 'secondary' | 'tertiary'} & ButtonProps,
	ref: React.ForwardedRef<HTMLButtonElement>,
) => (
	<BaseButton
		{...props}
		ref={ref}
		className={clsx(
			'h-8 p-1  rounded  text-sm font-bold flex items-center',
			variant === 'primary'
          && 'bg-stone-50 text-stone-950 hover:bg-stone-200',
			variant === 'secondary'
          && 'text-stone-300 hover:bg-stone-800 border border-stone-800',
			variant === 'tertiary'
          && 'bg-stone-950 text-stone-300 hover:bg-stone-900',
			className,
		)}
	/>
));
