import {useFormStatus} from 'react-dom';
import {useEffect} from 'react';
import {type ToastContent, useToasts} from '@/components/toast.tsx';
import {type FormState} from '@/components/form/form.tsx';

type FormSubmitListenerProps<T> = {
	readonly state: FormState<T>;
	readonly successToast: ToastContent;
};

export function FormSubmitListener<T>(props: FormSubmitListenerProps<T>) {
	const {successToast, state} = props;

	const {pending} = useFormStatus();
	const {add} = useToasts();

	useEffect(() => {
		if (state.success && !pending) {
			add(successToast, {timeout: 3000});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.success, pending]);

	return null;
}
