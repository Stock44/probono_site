import React, {type ReactNode, RefObject} from 'react';
import {useSelectState, type SelectStateOptions} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {
	useSelect,
	type AriaSelectProps,
	HiddenSelect,
	type Placement,
} from 'react-aria';
// @ts-expect-error bad typings
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import {Button} from './button/button.tsx';
import {Popover} from './popover.tsx';
import {ListBox} from './list-box.tsx';
import {cx} from './cva.ts';

export type SelectProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly placeholder?: ReactNode;
	readonly popoverPlacement?: Placement;
	readonly selectRef?: RefObject<HTMLButtonElement>;
} & AriaSelectProps<T> &
	SelectStateOptions<T>;

export function Select<T extends Record<string, unknown>>(
	props: SelectProps<T>,
) {
	const {
		className,
		label,
		isDisabled,
		name,
		placeholder,
		isRequired,
		selectRef,
		popoverPlacement = 'bottom start',
	} = props;
	const state = useSelectState({
		validationBehavior: 'native',
		...props,
	});
	const {selectedItem, isFocused, isOpen} = state;

	const triggerRef = useObjectRef(selectRef);

	const {
		labelProps,
		triggerProps,
		valueProps,
		menuProps,
		isInvalid,
		validationErrors,
		errorMessageProps,
	} = useSelect(
		{
			validationBehavior: 'native',
			...props,
		},
		state,
		triggerRef,
	);

	return (
		<div className={cx('w-fit group', className)}>
			{label && (
				<div
					{...labelProps}
					data-disabled={isDisabled}
					className={cx(
						'text-stone-400 text-sm mb-1 data-[disabled=true]:text-stone-500 transition-color',
						(isFocused || isOpen) && 'text-stone-50',
						isRequired && 'after:content-["*"] after:ms-0.5',
					)}
				>
					{label}
				</div>
			)}
			<HiddenSelect
				isDisabled={isDisabled}
				state={state}
				triggerRef={triggerRef}
				label={label}
				name={name}
			/>
			<Button
				{...triggerProps}
				buttonRef={triggerRef}
				variant='outlined'
				isDisabled={isDisabled}
				className={cx(
					'w-full flex group-focus-within:glow',
					isOpen && 'glow-sm shadow-stone-800 border-stone-50',
				)}
			>
				<span {...valueProps} className='grow text-left'>
					{selectedItem
						? selectedItem.rendered
						: placeholder ?? 'Selecciona una opción'}
				</span>
				<ArrowDropDown aria-hidden='true' className='fill-current' />
			</Button>
			{isOpen && (
				<Popover
					state={state}
					triggerRef={triggerRef}
					placement={popoverPlacement}
				>
					{/** @ts-expect-error children not necessary **/}
					<ListBox
						{...menuProps}
						state={state}
						className='max-h-96'
					/>
				</Popover>
			)}
			{isInvalid && (
				<div
					{...errorMessageProps}
					className='mt-1 text-xs text-red-400'
				>
					{validationErrors.join(' ')}
				</div>
			)}
		</div>
	);
}
