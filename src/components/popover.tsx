import React, {type ForwardedRef, forwardRef, type RefObject} from 'react';
import {type AriaPopoverProps, DismissButton, Overlay, usePopover} from 'react-aria';
import type {OverlayTriggerState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';

type PopoverProps = {
	readonly children: React.ReactNode;
	readonly state: OverlayTriggerState;
} & Omit<AriaPopoverProps, 'popoverRef'>;

const Popover = forwardRef((props: PopoverProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {children, state, offset = 8} = props;

	const popoverRef = useObjectRef(ref);

	const {popoverProps, underlayProps, arrowProps, placement} = usePopover({
		...props,
		offset,
		popoverRef,
	}, state);

	const combinedOverlayStyle = {
		...popoverProps.style,
		overflow: 'visible',
	};

	return (
		<Overlay>
			<div {...underlayProps} className='fixed inset-0'/>
			<div
				{...popoverProps}
				ref={popoverRef}
				style={combinedOverlayStyle}
				className='bg-stone-900 border border-stone-500 p-1 rounded overflow-y-scroll scroll-smooth scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thin scrollbar-thumb-stone-50'
			>
				<svg
					{...arrowProps}
					className='fill-stone-500 h-4 w-4 absolute data-[placement=top]:top-full data-[placement=top]:-translate-x-1/2
					 data-[placement=bottom]:bottom-full data-[placement=bottom]:-translate-x-1/2 data-[placement=bottom]:rotate-180
					 data-[placement=left]:left-full data-[placement=left]:-translate-y-1/2 data-[placement=left]:-rotate-90
					 data-[placement=right]:right-full data-[placement=right]:-translate-y-1/2 data-[placement=right]:rotate-90'
					data-placement={placement}
					viewBox='0 0 12 12'
				>
					<path d='M0 0 L6 6 L12 0'/>
				</svg>
				<DismissButton onDismiss={state.close}/>
				{children}
				<DismissButton onDismiss={state.close}/>
			</div>
		</Overlay>
	);
});

export default Popover;
