import React from 'react';
import {cx} from '@/lib/cva.ts';

export type LoadingSpinnerProps = {
	readonly className?: string;
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
	const {className} = props;
	return (
		<svg className={cx('animate-spin w-4 h-4', className)} viewBox='0 0 50 50'>
			<circle
				className='animate-spin-path stroke-4 stroke-current' cx='25' cy='25'
				r='20' fill='none'
				strokeWidth='5'/>
		</svg>
	);
}
