import React from 'react';
import { mergeProps, useTooltip, type AriaTooltipProps } from 'react-aria';
import type { TooltipTriggerState } from 'react-stately';

type TooltipProps = {
	ariaTooltipProps: AriaTooltipProps, 
	children: React.ReactNode,
	state?: TooltipTriggerState
}

const Tooltip = (props: TooltipProps) => {
	const { ariaTooltipProps, state, children } = props
	const { tooltipProps } = useTooltip(ariaTooltipProps, state);

	return (
	<span
		style={{
		position: 'absolute',
		left: '5px',
		top: '100%',
		maxWidth: 150,
		marginTop: '10px',
		backgroundColor: 'white',
		color: 'black',
		padding: '5px',
		border: '1px solid gray'
		}}
		{...mergeProps(ariaTooltipProps, tooltipProps)}
	>
		{children}
	</span>
	);
}

export default Tooltip;
