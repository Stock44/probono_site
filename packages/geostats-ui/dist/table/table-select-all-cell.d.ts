import * as react_jsx_runtime from 'react/jsx-runtime';
import { GridNode } from '@react-types/grid';
import { TableState } from 'react-stately';

type TableSelectAllCellProps<T> = {
    readonly column: GridNode<T>;
    readonly state: TableState<T>;
};
declare function TableSelectAllCell<T>(props: TableSelectAllCellProps<T>): react_jsx_runtime.JSX.Element;

export { type TableSelectAllCellProps, TableSelectAllCell as default };
