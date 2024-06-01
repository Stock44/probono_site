import * as react_jsx_runtime from 'react/jsx-runtime';
import { RefObject } from 'react';
import { AriaListBoxProps } from 'react-aria';
import { Node } from '@react-types/shared';
import { ListProps, ListState } from 'react-stately';

type ListBoxProps<T extends Record<string, unknown>> = StatefulListBoxProps<T> | BaseListBoxProps<T>;
declare function ListBox<T extends Record<string, unknown>>(props: ListBoxProps<T>): react_jsx_runtime.JSX.Element;
type StatefulListBoxProps<T extends Record<string, unknown>> = ListProps<T> & Omit<BaseListBoxProps<T>, 'state'>;
type BaseListBoxProps<T extends Record<string, unknown>> = {
    readonly className?: string;
    readonly listBoxRef?: RefObject<HTMLUListElement>;
    readonly state: ListState<T>;
} & AriaListBoxProps<T>;
declare function BaseListBox<T extends Record<string, unknown>>(props: BaseListBoxProps<T>): react_jsx_runtime.JSX.Element;
type ListBoxSectionProps<T> = {
    readonly section: Node<T>;
    readonly state: ListState<T>;
};
type OptionProps<T extends Record<string, unknown>> = {
    readonly item: Node<T>;
    readonly state: ListState<T>;
};

export { BaseListBox, type BaseListBoxProps, type ListBoxProps, type ListBoxSectionProps, type OptionProps, ListBox as default };
