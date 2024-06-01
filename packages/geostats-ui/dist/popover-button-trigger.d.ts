import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ReactElement } from 'react';
import { OverlayTriggerProps } from 'react-stately';
import { Placement } from 'react-aria';
import { ButtonProps } from './button/button.js';
import 'cva';
import './button/button-variants.js';

type PopoverButtonTriggerProps = {
    readonly className?: string;
    readonly label: ReactNode;
    readonly children: ReactElement;
    readonly placement: Placement;
} & OverlayTriggerProps & ButtonProps;
declare function PopoverButtonTrigger(props: PopoverButtonTriggerProps): react_jsx_runtime.JSX.Element;

export { PopoverButtonTrigger, type PopoverButtonTriggerProps };
