import React, {type ReactNode} from 'react';
import {FormValidationContext} from 'react-stately';
import {useFormState} from 'react-dom';

export type FormState<T> = {
	readonly redirectTo?: string;
	readonly formErrors: string[];
	readonly fieldErrors: {
		[K in keyof T]?: string[];
	};
};

export type FormProps<T> = {
	readonly children: ReactNode;
	readonly action: (previousState: FormState<T>, data: FormData) => Promise<FormState<T>>;
	readonly redirectTo?: string;
	readonly staticValues?: {
		readonly [K in keyof T]?: T[K] extends string | number | readonly string[] ? T[K] : never;
	};
};

export default function Form<T>(props: FormProps<T>) {
	const {children, action, staticValues, redirectTo} = props;
	const [result, formAction] = useFormState(action, {
		redirectTo,
		formErrors: [],
		fieldErrors: {},
	});

	const {
		formErrors,
		fieldErrors,
	} = result;

	return (
		<form action={formAction}>
			{
				staticValues && Object.entries(staticValues).map(([key, value]) => (
					<input key={key} readOnly hidden name={key} value={value as string | number | readonly string[] | undefined}/>
				))
			}

			{
				formErrors.length > 0 && <div className='rounded bg-red-400 text-stone-50'>
					{formErrors.join(' ')}
				</div>
			}
			<FormValidationContext.Provider
				// @ts-expect-error fieldErrors is of a correct type, provider is wrongly typed.
				value={fieldErrors}
			>
				{children}
			</FormValidationContext.Provider>
		</form>
	);
}
