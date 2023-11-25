import React, {useRef} from 'react';
import {type AriaComboBoxProps, useComboBox} from 'react-aria';
import {type ComboBoxState, type ComboBoxStateOptions, useComboBoxState} from 'react-stately';
import clsx from 'clsx';
import {BaseListBox} from '@/components/list-box.tsx';
import Button from '@/components/button.tsx';
import Popover from '@/components/popover.tsx';
import Icon from '@/components/icon.tsx';

export type ComboBoxProps<T extends Record<string, unknown>> = StatefulComboBoxProps<T> | BaseComboBoxProps<T>;

export default function ComboBox<T extends Record<string, unknown>>(props: ComboBoxProps<T>) {
	return (
		'state' in props ? <BaseComboBox {...props}/> : <StatefulComboBox {...props}/>
	);
}

export type StatefulComboBoxProps<T extends Record<string, unknown>> = Omit<BaseComboBoxProps<T>, 'state'> & ComboBoxStateOptions<T>;

export function StatefulComboBox<T extends Record<string, unknown>>(props: StatefulComboBoxProps<T>) {
	const state = useComboBoxState<T>(props);

	return <BaseComboBox {...props} state={state}/>;
}

export type BaseComboBoxProps<T extends Record<string, unknown>> = {
	readonly icon?: string;
	readonly className?: string;
	readonly state: ComboBoxState<T>;
} & AriaComboBoxProps<T>;

export function BaseComboBox<T extends Record<string, unknown>>(props: BaseComboBoxProps<T>) {
	const {icon, state, className} = props;

	const buttonObjectRef = useRef<HTMLButtonElement>(null);
	const inputObjectRef = useRef<HTMLInputElement>(null);
	const listBoxObjectRef = useRef<HTMLUListElement>(null);
	const popoverObjectRef = useRef<HTMLDivElement>(null);

	const {buttonProps, inputProps, listBoxProps, labelProps} = useComboBox<T>({
		...props,
		inputRef: inputObjectRef,
		buttonRef: buttonObjectRef,
		listBoxRef: listBoxObjectRef,
		popoverRef: popoverObjectRef,
	}, state);

	return (
		<div className={clsx('group', className)}>
			<label
				{...labelProps} className='text-stone-300 text-sm mb-1 group-focus-within:text-stone-50'>{props.label}</label>
			<div
				className='flex items-center text-stone-300 border border-stone-700 rounded bg-stone-950 group-focus-within:border-stone-50 '>
				{icon === undefined ? null : <Icon name={icon}/>}
				<input
					{...inputProps}
					ref={inputObjectRef}
					className='p-1 bg-transparent grow outline-0 placeholder:text-stone-500'
				/>
				<Button
					{...buttonProps}
					ref={buttonObjectRef}
					variant='text'
				>
					<Icon aria-hidden='true' name='arrow_drop_down'/>
				</Button>
				{state.isOpen
					? <Popover
						ref={popoverObjectRef}
						isNonModal
						state={state}
						triggerRef={inputObjectRef}
						placement='bottom start'
					>
						{/* @ts-expect-error children prop is passed in by react-aria */}
						<BaseListBox
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
