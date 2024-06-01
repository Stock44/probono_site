import * as react_jsx_runtime from 'react/jsx-runtime';
import { Key } from 'react-stately';
import { ReorderableListStateProps } from './hooks/use-reorderable-list-state.js';
import '@react-stately/selection';

type ListPrioritizerProps<T extends Record<string, unknown>> = {
    readonly onRemove: (key: Key) => void;
    readonly className?: string;
} & ReorderableListStateProps<T>;
declare function ListPrioritizer<T extends Record<string, unknown>>(props: ListPrioritizerProps<T>): react_jsx_runtime.JSX.Element;

export { type ListPrioritizerProps, ListPrioritizer as default };
