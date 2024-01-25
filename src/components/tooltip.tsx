import React from 'react';
import {mergeProps, useTooltip, type AriaTooltipProps} from 'react-aria';
import type {TooltipTriggerState} from 'react-stately';

export type TooltipProps = {
	readonly ariaTooltipProps: AriaTooltipProps;
	readonly children: React.ReactNode;
	readonly state?: TooltipTriggerState;
};

function Tooltip(props: TooltipProps) {
	const {ariaTooltipProps, state, children} = props;
	const {tooltipProps} = useTooltip(ariaTooltipProps, state);

	return (
		<span
			style={{
				position: 'absolute',
				left: '5px',
				top: '100%',
				marginTop: '10px',
				backgroundColor: 'white',
				color: 'black',
				padding: '5px',
				border: '1px solid gray',
			}}
			{...mergeProps(ariaTooltipProps, tooltipProps)}
			className='bg-stone-900 border border-stone-500 p-1 rounded overflow-y-scroll scroll-smooth scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thin scrollbar-thumb-stone-50'
		>
			{children}
		</span>
	);
}

export default Tooltip;
