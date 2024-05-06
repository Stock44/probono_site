import {type ListProps, useListState, type Key} from 'react-stately';

export type ReorderableListStateProps<T extends Record<string, unknown>> = {
	readonly onReorder: (key: Key, previous?: Key, next?: Key) => void;
} & ListProps<T>;

export default function useReorderableListState<
	T extends Record<string, unknown>,
>(props: ReorderableListStateProps<T>) {
	const {onReorder} = props;
	const state = useListState(props);

	return {
		...state,
		reorder(key: Key, previous?: Key, next?: Key) {
			onReorder(key, previous, next);
		},
	};
}
