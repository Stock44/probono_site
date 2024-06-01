import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ComponentProps } from 'react';
import { VariantProps } from 'cva';
import buttonVariants from './button-variants.js';

type ALinkButtonProps = {
    readonly children: ReactNode;
    readonly className?: string;
} & ComponentProps<'a'> & VariantProps<typeof buttonVariants>;
declare function ALinkButton(props: ALinkButtonProps): react_jsx_runtime.JSX.Element;

export { type ALinkButtonProps, ALinkButton as default };
