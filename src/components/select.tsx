import React, {type ForwardedRef, forwardRef, type ReactNode, useRef} from 'react';
import {useSelectState, type SelectStateOptions} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {useSelect, type AriaSelectProps, HiddenSelect} from 'react-aria';
import clsx from 'clsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Popover from '@/components/popover.tsx';
import ListBox from '@/components/list-box.tsx';

export type SelectProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly placeholder?: ReactNode;
} & AriaSelectProps<T> & SelectStateOptions<T>;

export default forwardRef(<T extends Record<string, unknown>>(props: SelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) => {
	const {className, label, isDisabled, name, placeholder} = props;
	const state = useSelectState(props);
	const {selectedItem, isFocused, isOpen} = state;

	const triggerRef = useObjectRef(ref);
	const popoverRef = useRef<HTMLDivElement>(null);

	const {labelProps, triggerProps, valueProps, menuProps} = useSelect(props, state, triggerRef);

	return (
		<div className={className}>
			<div {...labelProps} data-disabled={isDisabled} className={clsx('text-stone-300 text-sm mb-1 data-[disabled=true]:text-stone-500', (isFocused || isOpen) && 'text-stone-50')}>
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

				<Icon iconName='arrow_drop_down' aria-hidden='true'/>
			</Button>
			{
				isOpen && <Popover state={state} triggerRef={triggerRef} popoverRef={popoverRef} placement='bottom start'>
					{/** @ts-expect-error children not necessary **/}
					<ListBox {...menuProps} state={state}/>
				</Popover>
			}
		</div>
	);
});
