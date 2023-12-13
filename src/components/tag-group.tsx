import React, {forwardRef, type ForwardedRef, useRef} from 'react';
import {type AriaTagGroupProps, type AriaTagProps, useFocusRing, useTag, useTagGroup} from 'react-aria';
import {Set} from 'immutable';
import {useObjectRef} from '@react-aria/utils';
import {type ListState, useListState, type Node, type Key} from 'react-stately';
import Close from '@material-design-icons/svg/round/close.svg';
import Button from '@/components/button.tsx';

export type TagGroupProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly onRemove?: (keys: Set<Key>) => void;
} & Omit<AriaTagGroupProps<T>, 'onRemove'>;

export default forwardRef(<T extends Record<string, unknown>>(props: TagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
	const {className, label, description, errorMessage, onRemove} = props;
	const divRef = useObjectRef(ref);

	const state = useListState(props);

	const {gridProps, labelProps, descriptionProps, errorMessageProps} = useTagGroup({
		...props,
		onRemove: onRemove === undefined ? undefined : keys => {
			onRemove(Set(keys));
		},
	}, state, divRef);

	return (
		<div className={className}>
			<div {...labelProps} className='text-stone-300 text-sm mb-1'>{label}</div>
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
					<Button {...removeButtonProps} variant='text' size='sm'><Close className='fill-current'/></Button>
				)}
			</div>
		</div>
	);
}
