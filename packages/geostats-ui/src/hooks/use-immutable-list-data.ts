import {
	type Key,
	type ListData,
	type ListOptions,
	useListData,
} from 'react-stately';
import {List, Set} from 'immutable';
import {useMemo} from 'react';

export type ImmutableListOptions<T> = Omit<ListOptions<T>, 'initialItems'> & {
	readonly initialItems?: Iterable<T>;
};

export type ImmutableListData<T> = Omit<
	ListData<T>,
	'items' | 'selectedKeys' | 'setSelectedKeys'
> & {
	readonly items: List<T>;
	readonly selectedKeys: Set<Key> | 'all';
	readonly setSelectedKeys: (keys: Set<Key> | 'all') => void;
};

export function useImmutableListData<T>(
	options: ImmutableListOptions<T>,
): ImmutableListData<T> {
	const listData = useListData<T>({
		...options,
		initialItems:
			options.initialItems === undefined
				? undefined
				: [...options.initialItems],
	});

	const items = useMemo(() => List(listData.items), [listData.items]);

	const selectedKeys = useMemo(() => {
		const {selectedKeys} = listData;
		if (selectedKeys === 'all') {
			return 'all';
		}

		return Set(selectedKeys);
	}, [listData]);

	return {
		...listData,
		items,
		selectedKeys,
		setSelectedKeys(keys: 'all' | Set<Key>) {
			if (keys === 'all') {
				listData.setSelectedKeys('all');
				return;
			}

			// @ts-expect-error should not need the string conversion symbol
			listData.setSelectedKeys(keys);
		},
	};
}
