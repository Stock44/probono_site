import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { ButtonProps } from './button/button.js';
import 'react-aria';
import 'cva';
import './button/button-variants.js';

type SubmitButtonProps = {
    readonly children: ReactNode;
    readonly icon?: ReactNode;
    readonly iconPlacement?: 'left' | 'right';
} & Omit<ButtonProps, 'type'>;
declare function SubmitButton(props: SubmitButtonProps): react_jsx_runtime.JSX.Element;

export { SubmitButton, type SubmitButtonProps };
