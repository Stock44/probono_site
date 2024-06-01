import React__default, { ReactNode } from 'react';
import { AriaTextFieldProps } from 'react-aria';

type TextFieldProps = {
    readonly className?: string;
    readonly icon?: ReactNode;
} & AriaTextFieldProps;
declare const _default: React__default.ForwardRefExoticComponent<{
    readonly className?: string | undefined;
    readonly icon?: React__default.ReactNode;
} & AriaTextFieldProps & React__default.RefAttributes<HTMLInputElement>>;

export { type TextFieldProps, _default as default };
