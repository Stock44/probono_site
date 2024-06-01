import React from 'react';
import {cx} from './cva.ts';

export type LoadingSpinnerProps = {
	readonly className?: string;
};

export function LoadingSpinner(props: LoadingSpinnerProps) {
	const {className} = props;
	return (
		<svg
			className={cx('animate-spin w-4 h-4', className)}
			viewBox='0 0 50 50'
		>
			<circle
				className='animate-spin-path stroke-current stroke-4'
				cx='25'
				cy='25'
				r='20'
				fill='none'
				strokeWidth='5'
			/>
		</svg>
	);
}
