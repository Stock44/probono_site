'use client';
import React, {type ReactNode, useRef} from 'react';
import {type AriaDialogProps, useDialog} from 'react-aria';
import {cx} from './cva.ts';

export type DialogProps = {
	readonly title?: ReactNode;
	readonly children: ReactNode;
	readonly className?: string;
} & AriaDialogProps;

export function Dialog(props: DialogProps) {
	const {title, children, className} = props;

	const ref = useRef(null);

	const {dialogProps, titleProps} = useDialog(props, ref);

	return (
		<div
			{...dialogProps}
			ref={ref}
			className={cx('outline-none text-stone-300', className)}
		>
			{title === undefined ? null : (
				<h3 {...titleProps} className='mb-2 text-2xl font-bold'>
					{title}
				</h3>
			)}
			{children}
		</div>
	);
}
