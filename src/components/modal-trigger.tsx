import React, {type ReactElement, type ReactNode} from 'react';
import {type OverlayTriggerProps, useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import Modal, {type ModalProps} from '@/components/modal.tsx';
import Button from '@/components/button.tsx';
import {type ButtonVariantProps} from '@/components/variants/button.tsx';

export type ModalTriggerProps = {
	readonly className?: string;
	readonly children: (close: () => void) => ReactElement;
	readonly label: ReactNode;
} & OverlayTriggerProps & Omit<ModalProps, 'state' | 'children'> & ButtonVariantProps;

export default function ModalTrigger(props: ModalTriggerProps) {
	const {children, label, className} = props;
	const state = useOverlayTriggerState(props);
	const {triggerProps, overlayProps} = useOverlayTrigger({type: 'dialog'}, state);

	return (
		<>
			<Button {...props} {...triggerProps} className={className}>{label}</Button>
			{
				state.isOpen
						&& (
							<Modal state={state}>
								{React.cloneElement(children(state.close), overlayProps)}
							</Modal>
						)
			}
		</>
	);
}
