'use client';
import React, {type ReactNode, useRef} from 'react';
import {type AriaDialogProps, useDialog} from 'react-aria';
import {cx} from '@/lib/cva.ts';

export type DialogProps = {
	readonly title?: ReactNode;
	readonly children: ReactNode;
	readonly className?: string;
} & AriaDialogProps;

export default function Dialog(props: DialogProps) {
	const {title, children, className} = props;

	const ref = useRef(null);

	const {dialogProps, titleProps} = useDialog(props, ref);

	return (
		<div {...dialogProps} ref={ref} className='outline-none'>
			{
				title === undefined
					? null
					: <h3 {...titleProps} className={cx('text-stone-300 font-bold text-2xl mb-2', className)}>
						{title}
					</h3>
			}
			{children}
		</div>
	);
}
