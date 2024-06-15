import {useFormStatus} from 'react-dom';
import {useEffect} from 'react';
import {FormState} from '@/components/form/form.tsx';
import {ToastContent, useToasts} from 'geostats-ui';

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
