'use client';
import React, {type ReactElement, type ReactNode} from 'react';
import {type OverlayTriggerProps, useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import Button from '@/components/button.tsx';
import {type ButtonVariantProps} from '@/components/variants/button.tsx';
import Modal from '@/components/modal.tsx';
import Sidebar from '@/components/sidebar.tsx';

export type SidebarTriggerProps = {
	readonly children: (close: (() => void)) => ReactElement;
	readonly icon: ReactNode;
	readonly className?: string;
} & OverlayTriggerProps & ButtonVariantProps;

export default function SidebarTrigger(props: SidebarTriggerProps) {
	const {children, icon} = props;

	const state = useOverlayTriggerState(props);
	const {triggerProps, overlayProps} = useOverlayTrigger(
		{type: 'dialog'},
		state,
	);

	return (
		<>
			<Button {...props} {...triggerProps}>
				{icon}
			</Button>
			{state.isOpen
        && (<Sidebar isDismissable {...props} state={state}>{React.cloneElement(children(state.close), overlayProps)}</Sidebar>
        )}
		</>

	);
}
