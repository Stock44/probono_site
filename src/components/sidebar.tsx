'use client';

import React, {type ReactNode, useRef} from 'react';
import {type AriaModalOverlayProps, Overlay, useModalOverlay} from 'react-aria';
import {type OverlayTriggerState} from 'react-stately';

export type SidebarProps = {
	readonly state: OverlayTriggerState;
	readonly children: ReactNode;
} & AriaModalOverlayProps;

export default function Sidebar(props: SidebarProps) {
	const {state, children} = props;

	const ref = useRef<HTMLDivElement>(null);

	const {modalProps, underlayProps} = useModalOverlay(props, state, ref);

	// High z-index required to overlay over Leaflet maps
	return (
		<Overlay>
			<div
				className='fixed z-[1000] top-0 left-0 bottom-0 right-0 bg-black/50 flex flex-row-reverse'
				{...underlayProps}
			>
				<div
					{...modalProps}
					ref={ref}
					className='bg-stone-950 border-stone-800 border'
				>
					{children}
				</div>
			</div>
		</Overlay>
	);
}
