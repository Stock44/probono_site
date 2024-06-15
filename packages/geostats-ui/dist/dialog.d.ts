import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { AriaDialogProps } from 'react-aria';

type DialogProps = {
    readonly title?: ReactNode;
    readonly children: ReactNode;
    readonly className?: string;
} & AriaDialogProps;
declare function Dialog(props: DialogProps): react_jsx_runtime.JSX.Element;

export { Dialog, type DialogProps };
