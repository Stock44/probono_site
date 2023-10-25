import React, {type ForwardedRef, forwardRef, useRef} from 'react';
import {type AriaCheckboxProps, mergeProps, useCheckbox, useFocusRing, usePress, VisuallyHidden} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {useToggleState, type ToggleProps} from 'react-stately';

export default function Checkbox(props: AriaCheckboxProps & ToggleProps) {
	const {children} = props;
	const ref = useRef<HTMLInputElement>(null);
	const state = useToggleState(props);
	const {inputProps} = useCheckbox(props, state, ref);
	const {focusProps, isFocusVisible} = useFocusRing();
	const {pressProps} = usePress({isDisabled: props.isDisabled});

	return (
		<label>
			<VisuallyHidden>
				<input {...mergeProps(inputProps, focusProps)} ref={ref}/>
			</VisuallyHidden>
			<div className='w-6 h-6 border border-stone-700 rounded p-1' aria-hidden='true'>
				<svg {...pressProps} className='fill-none stroke-stone-50 stroke-2' viewBox='0 0 18 18'>
					<polyline
						className='transition-all duration-200'
						points='1 9 7 14 15 4'
						strokeDasharray={24}
						strokeDashoffset={state.isSelected ? 48 : 72}
					/>
				</svg>
			</div>
			{children}
		</label>
	);
}
