import React, {type ForwardedRef, forwardRef} from 'react';
import {
	type AriaPopoverProps,
	DismissButton,
	Overlay,
	usePopover,
} from 'react-aria';
import type {OverlayTriggerState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';

type PopoverProps = {
	readonly children: React.ReactNode;
	readonly state: OverlayTriggerState;
} & Omit<AriaPopoverProps, 'popoverRef'>;

const Popover = forwardRef(function Popover(
	props: PopoverProps,
	ref: ForwardedRef<HTMLDivElement>,
) {
	const {children, state, offset = 8} = props;

	const popoverRef = useObjectRef(ref);

	const {popoverProps, underlayProps, arrowProps, placement} = usePopover(
		{
			...props,
			offset,
			popoverRef,
		},
		state,
	);

	// Const combinedOverlayStyle = {
	// 	...popoverProps.style,
	// 	overflow: 'visible',
	// };
	// style={combinedOverlayStyle}

	return (
		<Overlay>
			<div {...underlayProps} className='fixed inset-0' />
			<div
				{...popoverProps}
				ref={popoverRef}
				className='scroll-smooth rounded border border-stone-500 bg-stone-900 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbar-thumb-rounded'
			>
				<svg
					{...arrowProps}
					className='absolute size-4 fill-stone-900 stroke-stone-500 stroke-[0.5px] data-[placement=bottom]:bottom-full
					 data-[placement=left]:left-full
					 data-[placement=right]:right-full data-[placement=top]:top-full data-[placement=bottom]:-translate-x-1/2
					 data-[placement=bottom]:rotate-180 data-[placement=left]:-rotate-90
					 data-[placement=right]:rotate-90'
					data-placement={placement}
					viewBox='0 0 12 12'
				>
					<path d='M0 0 L6 6 L12 0' />
				</svg>
				<DismissButton onDismiss={state.close} />
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
});

export {Popover};
