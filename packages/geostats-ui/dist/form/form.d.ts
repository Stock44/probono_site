import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { ToastContent } from '../toast.js';
import '@react-stately/toast';

type FormState<T> = {
    readonly success: boolean;
    readonly redirectTo?: string;
    readonly formErrors: string[];
    readonly fieldErrors: {
        [K in keyof T]?: string[];
    };
};
type StaticValues<T> = {
    readonly [K in keyof T]?: T[K];
};
type FormAction<T> = (previousState: FormState<T>, data: FormData) => Promise<FormState<T>>;
type FormProps<T> = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly action: FormAction<T>;
    readonly successToast?: ToastContent;
    readonly staticValues?: StaticValues<T>;
};
declare function Form<T>(props: FormProps<T>): react_jsx_runtime.JSX.Element;

export { Form, type FormAction, type FormProps, type FormState };
