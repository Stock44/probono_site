import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type TableRowGroupProps = {
    readonly type: keyof HTMLElementTagNameMap;
    readonly children: ReactNode;
};
declare function TableRowGroup(props: TableRowGroupProps): react_jsx_runtime.JSX.Element;

export { type TableRowGroupProps, TableRowGroup as default };
