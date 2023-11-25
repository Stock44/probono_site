import React, {type ForwardedRef, forwardRef, type ReactNode, useRef} from 'react';
import {useSelectState, type SelectStateOptions} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {useSelect, type AriaSelectProps, HiddenSelect} from 'react-aria';
import clsx from 'clsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Popover from '@/components/popover.tsx';
import ListBox from '@/components/list-box.tsx';
import {cx} from '@/lib/cva.ts';

export type SelectProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly placeholder?: ReactNode;
} & AriaSelectProps<T> & SelectStateOptions<T>;

export default forwardRef(<T extends Record<string, unknown>>(props: SelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) => {
	const {className, label, isDisabled, name, placeholder, isRequired} = props;
	const state = useSelectState({
		validationBehavior: 'native',
		...props,
	});
	const {selectedItem, isFocused, isOpen} = state;

	const triggerRef = useObjectRef(ref);
	const popoverRef = useRef<HTMLDivElement>(null);

	const {
		labelProps,
		triggerProps,
		valueProps,
		menuProps,
		isInvalid,
		validationErrors,
		errorMessageProps,
	} = useSelect({
		validationBehavior: 'native',
		...props,
	}, state, triggerRef);

	return (
		<div className={className}>
			<div
				{...labelProps} data-disabled={isDisabled} className={cx(
					'text-stone-400 text-sm mb-1 data-[disabled=true]:text-stone-500'
					, (isFocused || isOpen) && 'text-stone-50',
					isRequired && 'after:content-["*"] after:ms-0.5',
				)}>
				{label}
			</div>
			<HiddenSelect isDisabled={isDisabled} state={state} triggerRef={triggerRef} label={label} name={name}/>
			<Button
				{...triggerProps} ref={triggerRef} variant='outlined'
				isDisabled={isDisabled}
				className='w-full justify-between'>
				{
					selectedItem
						? selectedItem.rendered
						: (placeholder ?? 'Selecciona una opción')
				}
				<Icon name='arrow_drop_down' aria-hidden='true'/>
			</Button>
			{
				isOpen && <Popover ref={popoverRef} state={state} triggerRef={triggerRef} placement='bottom start'>
					{/** @ts-expect-error children not necessary **/}
					<ListBox {...menuProps} state={state}/>
				</Popover>
			}
			{
				isInvalid && <div {...errorMessageProps} className='text-red-400 mt-1 text-xs'>
					{validationErrors.join(' ')}
				</div>
			}
		</div>
	);
});
