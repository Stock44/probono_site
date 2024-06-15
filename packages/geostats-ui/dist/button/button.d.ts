import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, RefObject } from 'react';
import { AriaButtonOptions } from 'react-aria';
import { VariantProps } from 'cva';
import { buttonVariants } from './button-variants.js';

type ButtonProps = {
    readonly children?: ReactNode;
    readonly className?: string;
    readonly buttonRef?: RefObject<HTMLButtonElement>;
} & AriaButtonOptions<'button'> & VariantProps<typeof buttonVariants>;
declare function Button(props: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps };
