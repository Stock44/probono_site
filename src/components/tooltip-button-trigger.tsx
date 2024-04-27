import {useObjectRef} from '@react-aria/utils';
import React, {forwardRef, type ForwardedRef} from 'react';
import {mergeProps, useTooltipTrigger, type TooltipTriggerProps} from 'react-aria';
import {useTooltipTriggerState} from 'react-stately';
import type {ButtonProps} from './button.tsx';
import HelpTooltip from './help-tooltip.tsx';

type TooltipButtonProps = {
	readonly tooltipTriggerProps: TooltipTriggerProps;
	readonly children: React.ReactNode;
	readonly tooltip: React.ReactNode;
	readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
	readonly onClickAyuda?: React.MouseEventHandler<HTMLButtonElement>;
} & ButtonProps;

const TooltipButton = forwardRef((props: TooltipButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {tooltipTriggerProps, children, tooltip, onClick, onClickAyuda} = props;
	const state = useTooltipTriggerState(tooltipTriggerProps);
	const buttonRef = useObjectRef(ref);

	const {triggerProps, tooltipProps} = useTooltipTrigger(tooltipTriggerProps, state, buttonRef);

	return (
		<span style={{position: 'relative'}}>
			<button {...mergeProps(triggerProps, props)} ref={ref} onClick={onClick}>{children}</button>
			{state.isOpen && (
				<HelpTooltip state={state} ariaTooltipProps={tooltipProps} onClick={onClickAyuda}>{tooltip}</HelpTooltip>
			)}
		</span>
	);
});

export default TooltipButton;
