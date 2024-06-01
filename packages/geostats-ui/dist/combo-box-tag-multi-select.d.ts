import * as react_jsx_runtime from 'react/jsx-runtime';
import { Key } from 'react-stately';
import { List, Set } from 'immutable';
import { CollectionElement } from '@react-types/shared';

type ComboBoxTagMultiSelectProps<T extends Record<string, unknown>> = {
    readonly label?: string;
    readonly children: (item: T) => CollectionElement<T>;
    readonly items: List<T>;
    readonly filteredKeys: Set<Key>;
    readonly filterText: string;
    readonly setFilterText: (filterText: string) => void;
    readonly selectedKeys: Set<Key> | 'all';
    readonly setSelectedKeys: (keys: Set<Key> | 'all') => void;
    readonly className?: string;
    readonly searchPlaceholder?: string;
};
declare function ComboBoxTagMultiSelect<T extends Record<string, unknown>>(props: ComboBoxTagMultiSelectProps<T>): react_jsx_runtime.JSX.Element;

export { type ComboBoxTagMultiSelectProps, ComboBoxTagMultiSelect as default };
