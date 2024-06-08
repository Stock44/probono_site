import * as react_jsx_runtime from 'react/jsx-runtime';
import { GridNode } from '@react-types/grid';
import { TableState } from 'react-stately';

type TableCellProps<T> = {
    readonly cell: GridNode<T>;
    readonly state: TableState<T>;
};
declare function TableCell<T>(props: TableCellProps<T>): react_jsx_runtime.JSX.Element;

export { TableCell, type TableCellProps };
