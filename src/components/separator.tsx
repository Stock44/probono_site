'use client';
import React from 'react';
import {Root, type SeparatorProps} from '@radix-ui/react-separator';

export default function Separator(props: SeparatorProps) {
	return (
		<Root
			{...props}
			className='dark:bg-stone-700 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:h-px data-[orientation=horizontal]:my-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:mx-4'
		/>
	);
}
