import React, {type ForwardedRef, forwardRef} from 'react';
import {
	type AriaGridListProps,
	useGridList,
	useGridListItem,
	useFocusRing, mergeProps, useGridListSelectionCheckbox,
} from 'react-aria';
import {useListState, type ListProps as ListStateProps, type ListState, type Node} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import clsx from 'clsx';
import Checkbox from '@/components/checkbox.tsx';

export type ListProps<T extends Record<string, unknown>> = {
	readonly className?: string;
} & AriaGridListProps<T> & ListStateProps<T>;

export default forwardRef(<T extends Record<string, unknown>>(props: ListProps<T>, ref: ForwardedRef<HTMLUListElement>) => {
	const {className, selectionMode} = props;
	const state = useListState(props);
	const listRef = useObjectRef(ref);

	const {gridProps} = useGridList(props, state, listRef);

	return (
		<ul {...gridProps} ref={listRef} className={clsx('border border-stone-700 divide-y divide-stone-700 rounded', className)}>
			{[...state.collection].map(item => (
				<ListItem key={item.key} item={item} state={state}/>
			))}
		</ul>
	);
});

type ListItemProps<T extends Record<string, unknown>> = {
	readonly state: ListState<T>;
	readonly item: Node<T>;
};

function ListCheckbox<T extends Record<string, unknown>>(props: ListItemProps<T>) {
	const {state, item} = props;
	const {checkboxProps} = useGridListSelectionCheckbox({
		key: item.key,
	}, state);
	return <Checkbox {...checkboxProps}/>;
}

const ListItem = forwardRef(<T extends Record<string, unknown>> (props: ListItemProps<T>, ref: ForwardedRef<HTMLLIElement>) => {
	const {item, state} = props;
	const itemRef = useObjectRef(ref);
	const {rowProps, gridCellProps, isPressed} = useGridListItem({node: item}, state, itemRef);

	const {isFocusVisible, focusProps} = useFocusRing();

	const selectable = state.selectionManager.selectionMode !== 'none' && state.selectionManager.selectionBehavior === 'toggle';

	return (
		<li {...mergeProps(rowProps, focusProps)} ref={itemRef} className={clsx('p-2', selectable && 'cursor-pointer')}>
			<div {...gridCellProps} className={clsx('text-stone-300 flex items-center gap-4')}>
				{selectable && <ListCheckbox state={state} item={item}/>}
				{item.rendered}
			</div>
		</li>
	);
});
