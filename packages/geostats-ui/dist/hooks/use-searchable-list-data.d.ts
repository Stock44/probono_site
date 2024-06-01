import { Collection, Set } from 'immutable';
import { Key } from 'react-stately';
import { ImmutableListOptions, ImmutableListData } from './use-immutable-list-data.js';

type SearchableListOptions<T> = {
    readonly searchKeys?: Collection.Indexed<string>;
} & ImmutableListOptions<T>;
type SearchableListData<T> = {
    readonly filteredKeys: Set<Key>;
} & ImmutableListData<T>;
declare function useSearchableListData<T extends Record<string, unknown>>(options: SearchableListOptions<T>): SearchableListData<T>;

export { type SearchableListData, type SearchableListOptions, useSearchableListData as default };
