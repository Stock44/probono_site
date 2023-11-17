import React, {type ReactElement, type ReactNode} from 'react';
import {type OverlayTriggerProps, useOverlayTriggerState} from 'react-stately';
import {mergeProps, type Placement, useOverlayTrigger} from 'react-aria';
import Button, {type ButtonProps} from '@/components/button.tsx';
import Popover from '@/components/popover.tsx';

export type PopoverButtonTriggerProps = {
	readonly className?: string;
	readonly label: ReactNode;
	readonly children: ReactElement;
	readonly placement: Placement;
} & OverlayTriggerProps & ButtonProps;

export default function PopoverButtonTrigger(props: PopoverButtonTriggerProps) {
	const {label, children, placement} = props;
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const state = useOverlayTriggerState(props);
	const {triggerProps, overlayProps} = useOverlayTrigger(
		{type: 'dialog'},
		state,
		buttonRef,
	);

	return (
		<>
			<Button {...mergeProps(triggerProps, props)} ref={buttonRef}>{label}</Button>
			{state.isOpen
						&& (
							<Popover {...props} triggerRef={buttonRef} state={state} placement={placement}>
								{React.cloneElement(children, overlayProps)}
							</Popover>
						)}
		</>
	);
}
