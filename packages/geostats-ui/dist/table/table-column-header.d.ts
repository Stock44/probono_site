import * as react_jsx_runtime from 'react/jsx-runtime';
import { GridNode } from '@react-types/grid';
import { TableState } from 'react-stately';

type TableColumnHeaderProps<T> = {
    readonly column: GridNode<T>;
    readonly state: TableState<T>;
};
declare function TableColumnHeader<T>(props: TableColumnHeaderProps<T>): react_jsx_runtime.JSX.Element;

export { TableColumnHeader, type TableColumnHeaderProps };
