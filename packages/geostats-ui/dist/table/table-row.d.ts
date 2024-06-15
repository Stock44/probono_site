import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { GridNode } from '@react-types/grid';
import { TableState } from 'react-stately';

type TableRowProps<T> = {
    readonly item: GridNode<T>;
    readonly children: ReactNode;
    readonly state: TableState<T>;
};
declare function TableRow<T>(props: TableRowProps<T>): react_jsx_runtime.JSX.Element;

export { TableRow, type TableRowProps };
