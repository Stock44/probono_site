import React from 'react';
import {Input as BaseInput, type InputProps} from '@mui/base';
import clsx from 'clsx';

export const Input = React.forwardRef((
	{
		className,
		slotProps,
		...inputProps
	}: InputProps,
	ref: React.ForwardedRef<HTMLDivElement>,
) => (

	<BaseInput
		{...(inputProps)}
		ref={ref}
		slotProps={{
			...slotProps,
			input: {
				className:
								clsx('border-1 bg-stone-950 border-stone-700 rounded text-stone-50 p-2 text-sm w-full outline-none focus:border-stone-50', className),
			},
		}}
	/>
));
