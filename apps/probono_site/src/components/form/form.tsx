import React, {type ReactNode, useMemo} from 'react';
import {FormValidationContext} from 'react-stately';
import {useFormState} from 'react-dom';
import {Seq} from 'immutable';
import {type ToastContent} from 'geostats-ui';
import {FormSubmitListener} from '@/components/form/form-submit-listener.tsx';

export type FormState<T> = {
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

export type FormAction<T> = (
	previousState: FormState<T>,
	data: FormData,
) => Promise<FormState<T>>;

export type FormProps<T> = {
	readonly children: ReactNode;
	readonly className?: string;
	readonly action: FormAction<T>;
	readonly successToast?: ToastContent;
	readonly staticValues?: StaticValues<T>;
};

function processStaticValues<T>(
	staticValues: StaticValues<T> | undefined,
): Array<readonly [string, string | number]> {
	if (staticValues === undefined) {
		return [];
	}

	return Seq(Object.entries(staticValues))
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => {
			if (typeof value === 'boolean') {
				return [key, value ? 'true' : ''] as const;
			}

			if (value instanceof Date) {
				return [key, value.toString()] as const;
			}

			if (typeof value === 'object') {
				return [key, JSON.stringify(value)] as const;
			}

			if (typeof value === 'string' || typeof value === 'number') {
				return [key, value] as const;
			}

			throw new Error('failed to process static values for form');
		})
		.toArray();
}

export function Form<T>(props: FormProps<T>) {
	const {children, action, staticValues, successToast, className} = props;
	const [state, formAction] = useFormState(action, {
		success: false,
		formErrors: [],
		fieldErrors: {},
	});

	const {formErrors, fieldErrors} = state;

	const processedStaticValues = useMemo(
		() => processStaticValues(staticValues),
		[staticValues],
	);

	return (
		<form action={formAction} className={className}>
			{processedStaticValues.map(([key, value]) => (
				<input key={key} readOnly hidden name={key} value={value} />
			))}

			{formErrors.length > 0 && (
				<div className='mb-4 rounded bg-red-400 p-4 text-stone-50'>
					{formErrors.join(' ')}
				</div>
			)}
			{successToast && (
				<FormSubmitListener state={state} successToast={successToast} />
			)}
			{/** @ts-expect-error wrong typing**/}
			<FormValidationContext.Provider value={fieldErrors}>
				{children}
			</FormValidationContext.Provider>
		</form>
	);
}
