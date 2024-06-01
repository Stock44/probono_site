import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { AriaModalOverlayProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

type ModalProps = {
    readonly state: OverlayTriggerState;
    readonly children: ReactNode;
} & AriaModalOverlayProps;
declare function Modal(props: ModalProps): react_jsx_runtime.JSX.Element;

export { type ModalProps, Modal as default };
