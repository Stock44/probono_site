import React from 'react';
import {Input as BaseInput, type InputProps} from '@mui/base';
import clsx from 'clsx';

export const LabeledInput = React.forwardRef(function Input(
	{
		label,
		issueText,
		required,
		className,
		...inputProps
	}: {
		readonly label: string;
		readonly issueText?: string;
	} & Omit<InputProps, 'slotProps' | 'ref'>,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	return (
		<label className={clsx('flex flex-col gap-2 mb-4', className)}>
			<p className='text-xs text-stone-300'>
				{label}
				{required === true ? '*' : null}
			</p>
			<BaseInput
				{...(inputProps as any)}
				ref={ref}
				required={required}
				slotProps={{
					input: {
						className:
              'border-1 bg-stone-950 border-stone-700 rounded text-stone-50 p-2 text-sm w-full',
					},
				}}
			/>
			{issueText == null ? null : (
				<p className='text-red-400 text-xs'> {issueText}</p>
			)}
		</label>
	);
});
