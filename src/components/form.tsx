import React, {type ReactNode} from 'react';
import {FormValidationContext} from 'react-stately';
import {useFormState} from 'react-dom';
import {type Organization} from '@prisma/client';

export type FormState<T> = {
	readonly redirectTo?: string;
	readonly formErrors: string[];
	readonly fieldErrors: {
		[K in keyof T]?: string[];
	};
};

type ValidFormValues = string | boolean | string[] | number | undefined | null;

export type FormProps<T> = {
	readonly children: ReactNode;
	readonly action: (previousState: FormState<T>, data: FormData) => Promise<FormState<T>>;
	readonly redirectTo?: string;
	readonly staticValues?: {
		readonly [K in keyof T]?: ValidFormValues;
	};
};

type Test = FormProps<Organization>['staticValues'];

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
					value === undefined
						? null
						: <input key={key} readOnly hidden name={key} value={typeof value === 'boolean' ? (value ? 'true' : '') : value as string | string[] | number | null ?? ''}/>
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
