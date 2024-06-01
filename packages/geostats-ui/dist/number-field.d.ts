import * as React from 'react';
import { ReactNode } from 'react';
import { AriaNumberFieldProps } from 'react-aria';
import { NumberFieldStateOptions } from 'react-stately';

type NumberFieldProps = {
    readonly className?: string;
    readonly name?: string;
    readonly icon?: ReactNode;
} & AriaNumberFieldProps & Omit<NumberFieldStateOptions, 'locale'>;
declare const NumberField: React.ForwardRefExoticComponent<{
    readonly className?: string | undefined;
    readonly name?: string | undefined;
    readonly icon?: ReactNode;
} & AriaNumberFieldProps & Omit<NumberFieldStateOptions, "locale"> & React.RefAttributes<HTMLInputElement>>;

export { NumberField, type NumberFieldProps };
