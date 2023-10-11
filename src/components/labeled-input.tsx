import React from 'react';
import clsx from 'clsx';
import {Input} from '@/components/input.tsx';

export const LabeledInput = React.forwardRef((
	{
		label,
		issueText,
		required,
		className,
		...inputProps
	}: {
		readonly label: string;
		readonly issueText?: string;
	} & React.ComponentProps<typeof Input>,
	ref: React.ForwardedRef<HTMLDivElement>,
) => (
	<label className={clsx('flex flex-col gap-2 mb-4', className)}>
		<p className='text-xs text-stone-300'>
			{label}
			{required === true ? '*' : null}
		</p>
		<Input {...inputProps} required={required}/>
		{issueText === undefined ? null : (
			<p className='text-red-400 text-xs'> {issueText}</p>
		)}
	</label>
));
