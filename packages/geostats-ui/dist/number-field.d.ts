import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, RefObject } from 'react';
import { AriaNumberFieldProps } from 'react-aria';
import { NumberFieldStateOptions } from 'react-stately';

type NumberFieldProps = {
    readonly className?: string;
    readonly name?: string;
    readonly icon?: ReactNode;
    readonly inputRef?: RefObject<HTMLInputElement>;
} & AriaNumberFieldProps & Omit<NumberFieldStateOptions, 'locale'>;
declare function NumberField(props: NumberFieldProps): react_jsx_runtime.JSX.Element;

export { NumberField, type NumberFieldProps };
