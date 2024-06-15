import * as react_jsx_runtime from 'react/jsx-runtime';
import { RefObject } from 'react';
import { AriaGridListProps } from 'react-aria';
import { ListProps as ListProps$1, ListState, Node } from 'react-stately';

type ListProps<T extends Record<string, unknown>> = {
    readonly className?: string;
    readonly listRef?: RefObject<HTMLUListElement>;
} & AriaGridListProps<T> & ListProps$1<T>;
declare function List<T extends Record<string, unknown>>(props: ListProps<T>): react_jsx_runtime.JSX.Element;
type ListItemProps<T extends Record<string, unknown>> = {
    readonly state: ListState<T>;
    readonly item: Node<T>;
    readonly listItemRef?: RefObject<HTMLLIElement>;
};
declare function ListItem<T extends Record<string, unknown>>(props: ListItemProps<T>): react_jsx_runtime.JSX.Element;

export { List, ListItem, type ListProps };
