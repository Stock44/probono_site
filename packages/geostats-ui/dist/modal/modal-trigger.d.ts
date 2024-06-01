import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactElement, ReactNode } from 'react';
import { OverlayTriggerProps } from 'react-stately';
import { ModalProps } from './modal.js';
import { ButtonVariantProps } from '../button/button-variants.js';
import 'react-aria';
import 'cva';

type ModalTriggerProps = {
    readonly className?: string;
    readonly children: ReactElement;
    readonly label: ReactNode;
} & OverlayTriggerProps & Omit<ModalProps, 'state' | 'children'> & ButtonVariantProps;
declare function ModalTrigger(props: ModalTriggerProps): react_jsx_runtime.JSX.Element;

export { type ModalTriggerProps, ModalTrigger as default };
