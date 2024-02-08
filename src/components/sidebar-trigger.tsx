'use client';
import React, {type ReactElement, type ReactNode} from 'react';
import {type OverlayTriggerProps, useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import {AnimatePresence} from 'framer-motion';
import Button from '@/components/button.tsx';
import {type ButtonVariantProps} from '@/components/variants/button.tsx';
import Sidebar from '@/components/sidebar.tsx';

export type SidebarTriggerProps = {
	readonly children: ReactElement;
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
			<AnimatePresence>
				{state.isOpen
          && (<Sidebar isDismissable {...props} state={state}>{React.cloneElement(children, overlayProps)}</Sidebar>
          )}
			</AnimatePresence>
		</>

	);
}
