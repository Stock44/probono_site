import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactElement, ReactNode } from 'react';
import { OverlayTriggerProps } from 'react-stately';
import { ButtonVariantProps } from './button/button-variants.js';
import 'cva';

type SidebarTriggerProps = {
    readonly children: ReactElement;
    readonly icon: ReactNode;
    readonly className?: string;
} & OverlayTriggerProps & ButtonVariantProps;
declare function SidebarTrigger(props: SidebarTriggerProps): react_jsx_runtime.JSX.Element;

export { type SidebarTriggerProps, SidebarTrigger as default };
