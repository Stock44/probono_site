import React, {type ReactElement, type ReactNode} from 'react';
import {type OverlayTriggerProps, useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import Modal, {type ModalProps} from '@/components/modal.tsx';
import Button from '@/components/button.tsx';

export type ModalTriggerProps = {
	readonly children: (close: () => void) => ReactElement;
} & OverlayTriggerProps & Omit<ModalProps, 'state' | 'children'>;

export default function ModalTrigger(props: ModalTriggerProps) {
	const {children} = props;
	const state = useOverlayTriggerState(props);
	const {triggerProps, overlayProps} = useOverlayTrigger({type: 'dialog'}, state);

	return (
		<>
			<Button {...triggerProps}>Open Dialog</Button>
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
