import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, RefObject } from 'react';
import { SelectStateOptions } from 'react-stately';
import { Placement, AriaSelectProps } from 'react-aria';

type SelectProps<T extends Record<string, unknown>> = {
    readonly className?: string;
    readonly placeholder?: ReactNode;
    readonly popoverPlacement?: Placement;
    readonly selectRef?: RefObject<HTMLButtonElement>;
} & AriaSelectProps<T> & SelectStateOptions<T>;
declare function Select<T extends Record<string, unknown>>(props: SelectProps<T>): react_jsx_runtime.JSX.Element;

export { Select, type SelectProps };
