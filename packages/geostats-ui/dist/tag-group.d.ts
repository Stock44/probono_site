import * as react_jsx_runtime from 'react/jsx-runtime';
import { AriaTagGroupProps } from 'react-aria';
import { Set } from 'immutable';
import { Key } from 'react-stately';

type TagGroupProps<T extends Record<string, unknown>> = {
    readonly className?: string;
    readonly onRemove?: (keys: Set<Key>) => void;
} & Omit<AriaTagGroupProps<T>, 'onRemove'>;
declare function TagGroup<T extends Record<string, unknown>>(props: TagGroupProps<T>): react_jsx_runtime.JSX.Element;

export { TagGroup, type TagGroupProps };
