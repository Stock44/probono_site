import { ListOptions, ListData, Key } from 'react-stately';
import { List, Set } from 'immutable';

type ImmutableListOptions<T> = Omit<ListOptions<T>, 'initialItems'> & {
    readonly initialItems?: Iterable<T>;
};
type ImmutableListData<T> = Omit<ListData<T>, 'items' | 'selectedKeys' | 'setSelectedKeys'> & {
    readonly items: List<T>;
    readonly selectedKeys: Set<Key> | 'all';
    readonly setSelectedKeys: (keys: Set<Key> | 'all') => void;
};
declare function useImmutableListData<T>(options: ImmutableListOptions<T>): ImmutableListData<T>;

export { type ImmutableListData, type ImmutableListOptions, useImmutableListData };
