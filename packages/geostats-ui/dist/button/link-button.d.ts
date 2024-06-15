import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { LinkProps } from 'next/link';
import { VariantProps } from 'cva';
import { buttonVariants } from './button-variants.js';

type LinkButtonProps = {
    readonly children: ReactNode;
    readonly className?: string;
} & LinkProps & VariantProps<typeof buttonVariants>;
declare function LinkButton(props: LinkButtonProps): react_jsx_runtime.JSX.Element;

export { LinkButton, type LinkButtonProps };
