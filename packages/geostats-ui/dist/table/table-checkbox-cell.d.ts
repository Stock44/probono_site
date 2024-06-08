import * as react_jsx_runtime from 'react/jsx-runtime';
import { GridNode } from '@react-types/grid';
import { TableState } from 'react-stately';

type TableCheckboxCellProps<T> = {
    readonly cell: GridNode<T>;
    readonly state: TableState<T>;
};
declare function TableCheckboxCell<T>(props: TableCheckboxCellProps<T>): react_jsx_runtime.JSX.Element;

export { TableCheckboxCell, type TableCheckboxCellProps };
