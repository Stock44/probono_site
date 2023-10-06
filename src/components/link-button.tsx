'use client';

import React from 'react';
import Link from 'next/link';
import {Button as BaseButton, prepareForSlot} from '@mui/base';

const className
  = 'dark:bg-stone-700 h-8 p-1 text-stone-200 rounded-sm hover:bg-stone-600 text-sm flex justify-center items-center';

const LinkSlot = prepareForSlot(Link);

export const LinkButton = React.forwardRef((
	{
		label,
		iconName,
		...linkProps
	}: {readonly iconName?: string; readonly label: string} & Omit<
	React.ComponentProps<typeof Link>,
	'children' | 'className'
	>,
	ref: React.ForwardedRef<HTMLButtonElement>,
) => (
	<BaseButton
		{...(linkProps as any)}
		ref={ref}
		className={className}
		slots={{
			root: LinkSlot,
		}}
	>
		{iconName === undefined ? null : (
			<span className='material-symbols-rounded align-middle me-1'>
				{iconName}
			</span>
		)}
		{label}
	</BaseButton>
));
