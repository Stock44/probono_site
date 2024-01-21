import {useObjectRef} from '@react-aria/utils';
import React, {forwardRef, type ForwardedRef} from 'react';
import {mergeProps, useTooltipTrigger, type TooltipTriggerProps} from 'react-aria';
import {useTooltipTriggerState} from 'react-stately';
import Button, {type ButtonProps} from './button.tsx';
import Tooltip from './tooltip.tsx';

type TooltipButtonProps = {
	readonly tooltipTriggerProps: TooltipTriggerProps;
	readonly children: React.ReactNode;
	readonly tooltip: React.ReactNode;
} & ButtonProps;

const TooltipButton = forwardRef((props: TooltipButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {tooltipTriggerProps, children, tooltip} = props;
	const state = useTooltipTriggerState(tooltipTriggerProps);
	const buttonRef = useObjectRef(ref);

	const {triggerProps, tooltipProps} = useTooltipTrigger(tooltipTriggerProps, state, buttonRef);

	return (
		<span style={{position: 'relative'}}>
			<Button
				{...mergeProps(triggerProps, props)}
				ref={ref}
			>
				{children}
			</Button>
			{state.isOpen && (
				<Tooltip state={state} ariaTooltipProps={tooltipProps}>{tooltip}</Tooltip>
			)}
		</span>
	);
});

export default TooltipButton;
