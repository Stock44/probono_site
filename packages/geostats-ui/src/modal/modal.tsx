import React, {type ReactNode} from 'react';
import {type AriaModalOverlayProps, Overlay, useModalOverlay} from 'react-aria';
import {type OverlayTriggerState} from 'react-stately';

export type ModalProps = {
	readonly state: OverlayTriggerState;
	readonly children: ReactNode;
} & AriaModalOverlayProps;

export function Modal(props: ModalProps) {
	const {state, children} = props;
	const ref = React.useRef<HTMLDivElement>(null);
	const {modalProps, underlayProps} = useModalOverlay(props, state, ref);

	return (
		<Overlay>
			<div
				{...underlayProps}
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
			>
				<div
					{...modalProps}
					ref={ref}
					className='rounded border border-stone-800 bg-stone-950 p-4'
				>
					{children}
				</div>
			</div>
		</Overlay>
	);
}
