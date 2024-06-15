import React, {type RefObject} from 'react';
import {
	type AriaGridListProps,
	useGridList,
	useGridListItem,
	useFocusRing,
	mergeProps,
	useGridListSelectionCheckbox,
} from 'react-aria';
import {
	useListState,
	type ListProps as ListStateProps,
	type ListState,
	type Node,
} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {Checkbox} from './checkbox.tsx';
import {cx} from './cva.ts';

export type ListProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly listRef?: RefObject<HTMLUListElement>;
} & AriaGridListProps<T> &
	ListStateProps<T>;

export function List<T extends Record<string, unknown>>(props: ListProps<T>) {
	const {className} = props;
	const state = useListState(props);
	const listRef = useObjectRef(props.listRef);

	const {gridProps} = useGridList(props, state, listRef);

	return (
		<ul
			{...gridProps}
			ref={listRef}
			className={cx(
				'border border-stone-700 divide-y divide-stone-700 rounded',
				className,
			)}
		>
			{[...state.collection].map(item => (
				<ListItem key={item.key} item={item} state={state} />
			))}
		</ul>
	);
}

type ListItemProps<T extends Record<string, unknown>> = {
	readonly state: ListState<T>;
	readonly item: Node<T>;
	readonly listItemRef?: RefObject<HTMLLIElement>;
};

function ListCheckbox<T extends Record<string, unknown>>(
	props: ListItemProps<T>,
) {
	const {state, item} = props;
	const {checkboxProps} = useGridListSelectionCheckbox(
		{
			key: item.key,
		},
		state,
	);
	return <Checkbox {...checkboxProps} />;
}

export function ListItem<T extends Record<string, unknown>>(
	props: ListItemProps<T>,
) {
	const {item, state} = props;
	const itemRef = useObjectRef(props.listItemRef);
	const {rowProps, gridCellProps} = useGridListItem(
		{node: item},
		state,
		itemRef,
	);

	const {focusProps} = useFocusRing();

	const selectable =
		state.selectionManager.selectionMode !== 'none' &&
		state.selectionManager.selectionBehavior === 'toggle';

	return (
		<li
			{...mergeProps(rowProps, focusProps)}
			ref={itemRef}
			className={cx('p-2', selectable && 'cursor-pointer')}
		>
			<div
				{...gridCellProps}
				className={cx('text-stone-300 flex items-center gap-4')}
			>
				{selectable && <ListCheckbox state={state} item={item} />}
				{item.rendered}
			</div>
		</li>
	);
}
