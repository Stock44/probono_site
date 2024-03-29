'use client';
import React, {type ReactNode} from 'react';
import {useFormStatus} from 'react-dom';
import Button, {type ButtonProps} from '@/components/button/button.tsx';
import LoadingSpinner from '@/components/loading-spinner.tsx';

export type SubmitButtonProps = {
	readonly children: ReactNode;
	readonly icon?: ReactNode;
	readonly iconPlacement?: 'left' | 'right';
} & Omit<ButtonProps, 'type'>;

export default function SubmitButton(props: SubmitButtonProps) {
	const {isDisabled, children, icon, iconPlacement = 'left'} = props;
	const {pending} = useFormStatus();
	return (
		<Button {...props} isDisabled={isDisabled ?? pending} type='submit'>
			{
				iconPlacement === 'left' && (
					pending
						? (
							<LoadingSpinner className='m-1'/>
						) : icon
				)
			}
			{children}
			{
				iconPlacement === 'right' && (
					pending
						? (
							<LoadingSpinner className='m-1'/>
						) : icon
				)
			}
		</Button>
	);
}
