'use client';
import React, {type ReactElement, type ReactNode} from 'react';
import {type OverlayTriggerProps, useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import Modal, {type ModalProps} from '@/components/modal/modal.tsx';
import Button from '@/components/button.tsx';
import {type ButtonVariantProps} from '@/components/variants/button.tsx';
import {modalContext} from '@/components/modal/modal-context.ts';

export type ModalTriggerProps = {
	readonly className?: string;
	readonly children: ReactElement;
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
								{React.cloneElement(
									<modalContext.Provider value={state.close}>
										{children}
									</modalContext.Provider>
									, overlayProps)}
							</Modal>
						)
			}
		</>
	);
}
