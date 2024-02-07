'use client';

import React, {type ReactNode, useRef} from 'react';
import {type AriaModalOverlayProps, Overlay, useModalOverlay} from 'react-aria';
import {type OverlayTriggerState} from 'react-stately';
import {motion} from 'framer-motion';

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

			{/** @ts-expect-error react-aria doesn't use animation props **/ }
			<motion.div
				className='fixed z-[1000] top-0 left-0 bottom-0 right-0 flex flex-row-reverse'
				animate={{
					background: 'rgba(0,0,0,0.5)',
				}}
				initial={{
					background: 'rgba(0, 0, 0, 0)',
				}}
				exit={{
					background: 'rgba(0, 0, 0, 0)',
				}}
				{...underlayProps}
			>
				{/** @ts-expect-error react-aria doesn't use animation props **/}
				<motion.div
					{...modalProps}
					ref={ref}
					animate={{
						right: 0,
					}}
					initial={{
						right: '-100%',
					}}
					exit={{
						right: '-100%',
					}}
					className='relative bg-stone-950 border-stone-800 border'
				>
					{children}
				</motion.div>
			</motion.div>
		</Overlay>
	);
}
