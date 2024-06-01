import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { ToastState } from '@react-stately/toast';

type ToastContent = {
    variant?: 'success' | 'warn' | 'error';
    title: string;
    icon?: ReactNode;
    description?: string;
};
declare function useToasts(): ToastState<ToastContent>;
type ToastProviderProps = {
    readonly children: ReactNode;
};
declare function ToastProvider(props: ToastProviderProps): react_jsx_runtime.JSX.Element;

export { type ToastContent, ToastProvider, type ToastProviderProps, useToasts };
