import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { GridNode } from '@react-types/grid';
import { TableState } from 'react-stately';

type TableHeaderRowProps<T> = {
    readonly item: GridNode<T>;
    readonly state: TableState<T>;
    readonly children: ReactNode;
};
declare function TableHeaderRow<T>(props: TableHeaderRowProps<T>): react_jsx_runtime.JSX.Element;

export { TableHeaderRow, type TableHeaderRowProps };
