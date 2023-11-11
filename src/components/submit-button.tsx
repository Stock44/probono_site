import React from 'react';
import {useFormStatus} from 'react-dom';
import Button, {type ButtonProps} from '@/components/button.tsx';

export type SubmitButtonProps = Omit<ButtonProps, 'type'>;

export default function SubmitButton(props: SubmitButtonProps) {
	const {isDisabled} = props;
	const {pending} = useFormStatus();
	return <Button {...props} isDisabled={isDisabled ?? pending} type='submit'/>;
}
