import React, {forwardRef, type ForwardedRef, useRef, ReactNode} from 'react';
import {type AriaTagGroupProps, type AriaTagProps, useFocusRing, useTag, useTagGroup} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {type ListState, useListState, type Node} from 'react-stately';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';

export type TagGroupProps<T extends Record<string, unknown>> = {
	readonly className?: string;
} & AriaTagGroupProps<T>;

export default forwardRef(<T extends Record<string, unknown>>(props: TagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
	const {className, label, description, errorMessage} = props;
	const divRef = useObjectRef(ref);

	const state = useListState(props);

	const {gridProps, labelProps, descriptionProps, errorMessageProps} = useTagGroup(props, state, divRef);

	return (
		<div className={className}>
			<div {...labelProps} className='text-stone-400 text-sm mb-1'>{label}</div>
			<div {...gridProps} ref={divRef} className='flex flex-wrap gap-2'>
				{[...state.collection].map(item => (
					<Tag key={item.key} item={item} state={state}/>
				))}
			</div>
			{
				description === undefined
					? null : <div {...descriptionProps}>
						{description}
					</div>
			}
			{errorMessage === undefined ? null : <div {...errorMessageProps}> {errorMessage} </div>}
		</div>
	);
});

type TagProps<T> = {
	readonly item: Node<T>;
	readonly state: ListState<T>;
} & AriaTagProps<T>;

function Tag<T>(props: TagProps<T>) {
	const {item, state} = props;

	const ref = useRef(null);

	const {focusProps, isFocusVisible} = useFocusRing({
		within: true,
	});

	const {rowProps, gridCellProps, removeButtonProps, allowsRemoving} = useTag(props, state, ref);

	return (
		<div ref={ref} {...rowProps} {...focusProps} data-focus-visible={isFocusVisible}>
			<div {...gridCellProps} className='flex gap-2 items-center border border-stone-700 text-stone-300 rounded px-2'>
				{item.rendered}
				{allowsRemoving && (
					<Button {...removeButtonProps} variant='tertiary' size='xs'><Icon iconName='close' size='sm'/></Button>
				)}
			</div>
		</div>
	);
}
