import React, {type ComponentProps} from 'react';
import clsx from 'clsx';
import {Input} from '@/components/input.tsx';
import Icon from '@/components/icon.tsx';

export default function InputWithIcon({slotProps, className, iconName, ...props}: {readonly iconName: string} & ComponentProps<typeof Input>) {
	return (
		<div className={clsx('flex px-2 gap-1 items-center rounded border border-stone-800 group focus-within:border-stone-50', className)}>
			<Icon name={iconName} className='text-stone-600 group-focus-within:text-stone-50'/>
			<Input
				{...props} className='border-none' slotProps={{
					...slotProps,
					root: {
						className: 'grow',
					},
				}}/>
		</div>
	);
}
