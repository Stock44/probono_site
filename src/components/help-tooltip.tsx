import Question from '@material-design-icons/svg/outlined/question_mark.svg';
import React from 'react';
import Button from './button';
import Tooltip, { TooltipProps } from './tooltip';

type HelpTooltipProps = {
    readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & TooltipProps;

function HelpTooltip(props: HelpTooltipProps) {
	const {ariaTooltipProps, state, children, onClick} = props;

	return (
		<Tooltip state={state} ariaTooltipProps={ariaTooltipProps}>
			<div className='flex'>
				<Question className='mt-1' width='148'/>
				<div>
					{children}
                    {onClick && 
                        <div className='flex justify-end mr-1 mt-2'>
                            <Button variant='secondary'>Ayuda</Button>
                        </div>
                    }
				</div>
			</div>
		</Tooltip>

	);
}

export default HelpTooltip;
