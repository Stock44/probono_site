'use client';
import React, {type ReactNode} from 'react';
import {useFormStatus} from 'react-dom';
import {Button, ButtonProps, LoadingSpinner} from 'geostats-ui';

export type SubmitButtonProps = {
	readonly children: ReactNode;
	readonly icon?: ReactNode;
	readonly iconPlacement?: 'left' | 'right';
} & Omit<ButtonProps, 'type'>;

export function SubmitButton(props: SubmitButtonProps) {
	const {isDisabled, children, icon, iconPlacement = 'left'} = props;
	const {pending} = useFormStatus();
	return (
		<Button {...props} isDisabled={isDisabled ?? pending} type='submit'>
			{iconPlacement === 'left' &&
				(pending ? <LoadingSpinner className='m-1' /> : icon)}
			{children}
			{iconPlacement === 'right' &&
				(pending ? <LoadingSpinner className='m-1' /> : icon)}
		</Button>
	);
}
