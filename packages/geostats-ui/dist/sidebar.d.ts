import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { AriaModalOverlayProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

type SidebarProps = {
    readonly state: OverlayTriggerState;
    readonly children: ReactNode;
} & AriaModalOverlayProps;
declare function Sidebar(props: SidebarProps): react_jsx_runtime.JSX.Element;

export { Sidebar, type SidebarProps };
