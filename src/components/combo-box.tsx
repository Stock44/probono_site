import React, {type ForwardedRef} from 'react';
import {type AriaComboBoxOptions, type AriaComboBoxProps, useComboBox} from 'react-aria';
import {type ComboBoxStateOptions, useComboBoxState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import ListBox from '@/components/list-box.tsx';
import Button from '@/components/button.tsx';
import Popover from '@/components/popover.tsx';
import Icon from '@/components/icon.tsx';

export type ComboBoxProps<T> = {
	readonly buttonRef?: ForwardedRef<HTMLButtonElement>;
	readonly inputRef?: ForwardedRef<HTMLInputElement>;
	readonly listBoxRef?: ForwardedRef<HTMLUListElement>;
	readonly popoverRef?: ForwardedRef<HTMLDivElement>;
	readonly icon?: string;
} & AriaComboBoxProps<T> & ComboBoxStateOptions<T> & AriaComboBoxOptions<T>;

export default function ComboBox<T extends Record<string, unknown>>(props: ComboBoxProps<T>) {
	const {buttonRef, inputRef, listBoxRef, popoverRef, icon} = props;

	const state = useComboBoxState<T>(props);

	const buttonObjectRef = useObjectRef(buttonRef);
	const inputObjectRef = useObjectRef(inputRef);
	const listBoxObjectRef = useObjectRef(listBoxRef);
	const popoverObjectRef = useObjectRef(popoverRef);

	const {buttonProps, inputProps, listBoxProps, labelProps} = useComboBox<T>({
		...props,
		inputRef: inputObjectRef,
		buttonRef: buttonObjectRef,
		listBoxRef: listBoxObjectRef,
		popoverRef: popoverObjectRef,
	}, state);

	return (
		<div className='mb-4 group'>
			<label {...labelProps} className='text-stone-400 text-sm mb-1 group-focus-within:text-stone-50'>{props.label}</label>
			<div className='flex items-center text-stone-300 border border-stone-700 rounded bg-stone-950 group-focus-within:border-stone-50 '>
				{icon === undefined ? null : <Icon iconName={icon}/>}
				<input
					{...inputProps}
					ref={inputObjectRef}
					className='p-1 bg-transparent grow outline-0'
				/>
				<Button
					{...buttonProps}
					ref={buttonObjectRef}
					variant='tertiary'
				>
					<Icon aria-hidden='true' iconName='arrow_drop_down'/>
				</Button>
				{state.isOpen
					? <Popover
						isNonModal
						state={state}
						triggerRef={inputObjectRef}
						popoverRef={popoverObjectRef}
						placement='bottom start'
					>
						{/* @ts-expect-error children prop is passed in by react-aria */}
						<ListBox
							{...listBoxProps}
							ref={listBoxObjectRef}
							state={state}
							className='h-full'
						/>
					</Popover>
					: null}
			</div>
		</div>
	);
}
