import React__default from 'react';
import { AriaGridListProps } from 'react-aria';
import { ListProps as ListProps$1, ListState, Node } from 'react-stately';

type ListProps<T extends Record<string, unknown>> = {
    readonly className?: string;
} & AriaGridListProps<T> & ListProps$1<T>;
declare const _default: React__default.ForwardRefExoticComponent<{
    readonly className?: string | undefined;
} & AriaGridListProps<Record<string, unknown>> & ListProps$1<Record<string, unknown>> & React__default.RefAttributes<HTMLUListElement>>;

type ListItemProps<T extends Record<string, unknown>> = {
    readonly state: ListState<T>;
    readonly item: Node<T>;
};
declare const ListItem: React__default.ForwardRefExoticComponent<ListItemProps<Record<string, unknown>> & React__default.RefAttributes<HTMLLIElement>>;

export { ListItem, type ListProps, _default as default };
