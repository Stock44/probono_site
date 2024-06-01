import React, {type ReactNode, useRef} from 'react';
import {type AriaComboBoxProps, useComboBox} from 'react-aria';
import {
	type ComboBoxState,
	type ComboBoxStateOptions,
	useComboBoxState,
} from 'react-stately';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import {BaseListBox} from './list-box.tsx';
import Button from './button/button.tsx';
import Popover from './popover.tsx';
import {cx} from './cva.ts';

export type ComboBoxProps<T extends Record<string, unknown>> =
	| StatefulComboBoxProps<T>
	| BaseComboBoxProps<T>;

export default function ComboBox<T extends Record<string, unknown>>(
	props: ComboBoxProps<T>,
) {
	return 'state' in props ? (
		<BaseComboBox {...props} />
	) : (
		<StatefulComboBox {...props} />
	);
}

export type StatefulComboBoxProps<T extends Record<string, unknown>> = Omit<
	BaseComboBoxProps<T>,
	'state'
> &
	ComboBoxStateOptions<T>;

export function StatefulComboBox<T extends Record<string, unknown>>(
	props: StatefulComboBoxProps<T>,
) {
	const state = useComboBoxState<T>(props);

	return <BaseComboBox {...props} state={state} />;
}

export type BaseComboBoxProps<T extends Record<string, unknown>> = {
	readonly icon?: ReactNode;
	readonly className?: string;
	readonly state: ComboBoxState<T>;
} & AriaComboBoxProps<T>;

export function BaseComboBox<T extends Record<string, unknown>>(
	props: BaseComboBoxProps<T>,
) {
	const {icon, state, className} = props;

	const buttonObjectRef = useRef<HTMLButtonElement>(null);
	const inputObjectRef = useRef<HTMLInputElement>(null);
	const listBoxObjectRef = useRef<HTMLUListElement>(null);
	const popoverObjectRef = useRef<HTMLDivElement>(null);

	const {buttonProps, inputProps, listBoxProps, labelProps} = useComboBox<T>(
		{
			...props,
			inputRef: inputObjectRef,
			buttonRef: buttonObjectRef,
			listBoxRef: listBoxObjectRef,
			popoverRef: popoverObjectRef,
		},
		state,
	);

	return (
		<div className={cx('group w-fit', className)}>
			<label
				{...labelProps}
				className='mb-1 text-sm text-stone-300 transition-colors group-focus-within:text-stone-50'
			>
				{props.label}
			</label>
			<div className='flex w-full rounded border border-stone-700 bg-stone-950 text-stone-300 transition-all group-focus-within:border-stone-50 group-focus-within:shadow-stone-800 group-focus-within:glow-sm'>
				{icon}
				<input
					{...inputProps}
					ref={inputObjectRef}
					className='grow bg-transparent p-1 outline-0 placeholder:text-stone-500'
				/>
				<Button {...buttonProps} ref={buttonObjectRef} variant='text'>
					<ArrowDropDown
						aria-hidden='true'
						className='fill-current'
					/>
				</Button>
				{state.isOpen ? (
					<Popover
						ref={popoverObjectRef}
						state={state}
						triggerRef={inputObjectRef}
						placement='bottom start'
					>
						{/* @ts-expect-error children prop is passed in by react-aria */}
						<BaseListBox
							{...listBoxProps}
							listBoxRef={listBoxObjectRef}
							state={state}
							className='max-h-96'
						/>
					</Popover>
				) : null}
			</div>
		</div>
	);
}
