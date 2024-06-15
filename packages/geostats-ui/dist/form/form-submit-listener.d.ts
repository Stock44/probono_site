import { FormState } from './form.js';
import { ToastContent } from '../toast.js';
import 'react/jsx-runtime';
import 'react';
import '@react-stately/toast';

type FormSubmitListenerProps<T> = {
    readonly state: FormState<T>;
    readonly successToast: ToastContent;
};
declare function FormSubmitListener<T>(props: FormSubmitListenerProps<T>): null;

export { FormSubmitListener };
