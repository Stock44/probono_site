import React, {type ReactNode, useRef} from 'react';
import {type AriaDialogProps, useDialog} from 'react-aria';

export type DialogProps = {
	readonly title?: ReactNode;
	readonly children: ReactNode;
} & AriaDialogProps;

export default function Dialog(props: DialogProps) {
	const {title, children} = props;

	const ref = useRef(null);

	const {dialogProps, titleProps} = useDialog(props, ref);

	return (
		<div {...dialogProps} ref={ref} className='outline-none'>
			{
				title === undefined
					? null
					: <h3 {...titleProps} className='text-stone-300 text-lg mb-2'>
						{title}
					</h3>
			}
			{children}
		</div>
	);
}
