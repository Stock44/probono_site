'use client';
import React from 'react';
import {Root, Indicator, type CheckboxProps} from '@radix-ui/react-checkbox';
import clsx from 'clsx';

export default function LabeledCheckbox({
	label,
	className,
	...props
}: {readonly label: string} & CheckboxProps) {
	return (
		<label className={clsx('flex gap-2 items-center mb-4', className)}>
			<Root
				{...props}
				className='w-6 h-6  border-stone-700 border rounded'
			>
				<Indicator className='material-symbols-rounded text-stone-200'>check</Indicator>
			</Root>
			<p className='text-sm text-stone-300'>{label}</p>
		</label>
	);
}
