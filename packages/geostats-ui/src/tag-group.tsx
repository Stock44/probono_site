import React, {useRef} from 'react';
import {
	type AriaTagGroupProps,
	type AriaTagProps,
	useFocusRing,
	useTag,
	useTagGroup,
} from 'react-aria';
import {Set} from 'immutable';
import {type Key, type ListState, type Node, useListState} from 'react-stately';
import Close from '@material-design-icons/svg/round/close.svg';
import {Button} from './button/button.tsx';

export type TagGroupProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly onRemove?: (keys: Set<Key>) => void;
} & Omit<AriaTagGroupProps<T>, 'onRemove'>;

export function TagGroup<T extends Record<string, unknown>>(
	props: TagGroupProps<T>,
) {
	const {className, label, description, errorMessage, onRemove} = props;
	const divRef = useRef<HTMLDivElement>(null);

	const state = useListState(props);

	const {gridProps, labelProps, descriptionProps, errorMessageProps} =
		useTagGroup(
			{
				...props,
				onRemove:
					onRemove === undefined
						? undefined
						: keys => {
								onRemove(Set(keys));
							},
			},
			state,
			divRef,
		);

	return (
		<div className={className}>
			<div {...labelProps} className='mb-1 text-sm text-stone-300'>
				{label}
			</div>
			<div {...gridProps} ref={divRef} className='flex flex-wrap gap-2'>
				{[...state.collection].map(item => (
					<Tag key={item.key} item={item} state={state} />
				))}
			</div>
			{description === undefined ? null : (
				<div {...descriptionProps}>{description}</div>
			)}
			{errorMessage === undefined ? null : (
				<div {...errorMessageProps}> {errorMessage} </div>
			)}
		</div>
	);
}

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

	const {rowProps, gridCellProps, removeButtonProps, allowsRemoving} = useTag(
		props,
		state,
		ref,
	);

	return (
		<div
			ref={ref}
			{...rowProps}
			{...focusProps}
			data-focus-visible={isFocusVisible}
		>
			<div
				{...gridCellProps}
				className='flex items-center gap-2 rounded border border-stone-700 px-2 text-stone-300'
			>
				{item.rendered}
				{allowsRemoving && (
					<Button {...removeButtonProps} variant='text' size='sm'>
						<Close className='fill-current' />
					</Button>
				)}
			</div>
		</div>
	);
}
