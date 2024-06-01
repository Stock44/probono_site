import React__default, { ReactNode } from 'react';
import { SelectStateOptions } from 'react-stately';
import { Placement, AriaSelectProps } from 'react-aria';

type SelectProps<T extends Record<string, unknown>> = {
    readonly className?: string;
    readonly placeholder?: ReactNode;
    readonly popoverPlacement?: Placement;
} & AriaSelectProps<T> & SelectStateOptions<T>;
declare const Select: React__default.ForwardRefExoticComponent<{
    readonly className?: string | undefined;
    readonly placeholder?: ReactNode;
    readonly popoverPlacement?: Placement | undefined;
} & AriaSelectProps<Record<string, unknown>> & SelectStateOptions<Record<string, unknown>> & React__default.RefAttributes<HTMLButtonElement>>;

export { Select, type SelectProps };
