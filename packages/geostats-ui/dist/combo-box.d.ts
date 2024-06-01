import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { AriaComboBoxProps } from 'react-aria';
import { ComboBoxStateOptions, ComboBoxState } from 'react-stately';

type ComboBoxProps<T extends Record<string, unknown>> = StatefulComboBoxProps<T> | BaseComboBoxProps<T>;
declare function ComboBox<T extends Record<string, unknown>>(props: ComboBoxProps<T>): react_jsx_runtime.JSX.Element;
type StatefulComboBoxProps<T extends Record<string, unknown>> = Omit<BaseComboBoxProps<T>, 'state'> & ComboBoxStateOptions<T>;
declare function StatefulComboBox<T extends Record<string, unknown>>(props: StatefulComboBoxProps<T>): react_jsx_runtime.JSX.Element;
type BaseComboBoxProps<T extends Record<string, unknown>> = {
    readonly icon?: ReactNode;
    readonly className?: string;
    readonly state: ComboBoxState<T>;
} & AriaComboBoxProps<T>;
declare function BaseComboBox<T extends Record<string, unknown>>(props: BaseComboBoxProps<T>): react_jsx_runtime.JSX.Element;

export { BaseComboBox, type BaseComboBoxProps, ComboBox, type ComboBoxProps, StatefulComboBox, type StatefulComboBoxProps };
