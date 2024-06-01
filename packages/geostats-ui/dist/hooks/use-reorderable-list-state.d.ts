import * as _react_stately_selection from '@react-stately/selection';
import * as react_stately from 'react-stately';
import { Key, ListProps } from 'react-stately';

type ReorderableListStateProps<T extends Record<string, unknown>> = {
    readonly onReorder: (key: Key, previous?: Key, next?: Key) => void;
} & ListProps<T>;
declare function useReorderableListState<T extends Record<string, unknown>>(props: ReorderableListStateProps<T>): {
    reorder(key: Key, previous?: Key, next?: Key): void;
    collection: react_stately.Collection<react_stately.Node<T>>;
    disabledKeys: Set<Key>;
    selectionManager: _react_stately_selection.SelectionManager;
};

export { type ReorderableListStateProps, useReorderableListState as default };
