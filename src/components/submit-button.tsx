import React, {type ReactNode} from 'react';
import {useFormStatus} from 'react-dom';
import Button, {type ButtonProps} from '@/components/button.tsx';
import LoadingSpinner from '@/components/loading-spinner.tsx';

export type SubmitButtonProps = {
	readonly children: ReactNode;
	readonly icon: ReactNode;
	readonly iconPlacement?: 'left' | 'right';
} & Omit<ButtonProps, 'type'>;

export default function SubmitButton(props: SubmitButtonProps) {
	const {isDisabled, children, icon, iconPlacement = 'left'} = props;
	const {pending} = useFormStatus();
	return (
		<Button {...props} isDisabled={isDisabled ?? pending} type='submit'>
			{
				iconPlacement === 'left' && (
					<>
						{
							pending
								? (
									<LoadingSpinner/>
								) : icon
						}
						<span className='w-1'/>
					</>
				)
			}
			{children}
			{
				iconPlacement === 'right' && (
					<>
						<span className='w-1'/>
						{
							pending
								? (
									<svg className='animate-spin w-4 h-4' viewBox='0 0 50 50'>
										<circle
											className='animate-spin-path stroke-4 stroke-stone-900' cx='25' cy='25'
											r='20' fill='none'
											strokeWidth='5'/>
									</svg>
								) : icon
						}
					</>
				)
			}
		</Button>
	);
}
