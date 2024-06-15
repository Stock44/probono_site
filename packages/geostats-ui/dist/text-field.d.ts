import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, RefObject } from 'react';
import { AriaTextFieldProps } from 'react-aria';

type TextFieldProps = {
    readonly className?: string;
    readonly icon?: ReactNode;
    readonly inputRef?: RefObject<HTMLInputElement>;
} & AriaTextFieldProps;
declare function TextField(props: TextFieldProps): react_jsx_runtime.JSX.Element;

export { TextField, type TextFieldProps };
