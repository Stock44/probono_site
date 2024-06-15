'use client';
import React from 'react';
import {type User} from '@prisma/client';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import {
	type UserInit,
	userInitSchema,
	type UserUpdate,
} from '@/lib/schemas/user.ts';
import {formValidators} from '@/lib/form-utils.ts';
import {TextField} from 'geostats-ui';
import {Form, FormState} from '@/components/form';
import {SubmitButton} from '@/components/submit-button.tsx';

export type UserOnboardingFormProps =
	| {
	readonly user: User;
	readonly action: (
		state: FormState<UserUpdate>,
		data: FormData,
	) => Promise<FormState<UserUpdate>>;
}
	| {
	readonly action: (
		state: FormState<UserInit>,
		data: FormData,
	) => Promise<FormState<UserInit>>;
	readonly defaultEmail: string;
	readonly defaultFamilyName: string;
	readonly defaultGivenName: string;
};

export default function UserOnboardingForm(props: UserOnboardingFormProps) {
	const {action} = props;

	const user = 'user' in props ? props.user : undefined;
	const defaultEmail =
		'defaultEmail' in props ? props.defaultEmail : undefined;
	const defaultFamilyName =
		'defaultFamilyName' in props ? props.defaultFamilyName : undefined;
	const defaultGivenName =
		'defaultGivenName' in props ? props.defaultGivenName : undefined;

	const validate = formValidators(userInitSchema);

	return (
		<Form action={action}>
			<TextField
				isRequired
				className="mb-4"
				name="givenName"
				label="Nombre(s)"
				validate={validate.givenName}
				defaultValue={user?.givenName ?? defaultGivenName ?? ''}
			/>
			<TextField
				isRequired
				className="mb-4"
				name="familyName"
				label="Apellido(s)"
				validate={validate.familyName}
				defaultValue={user?.familyName ?? defaultFamilyName ?? ''}
			/>
			<TextField
				className="mb-4"
				name="contactEmail"
				label="Correo electrónico de contacto"
				validate={validate.contactEmail}
				defaultValue={user?.contactEmail ?? defaultEmail ?? ''}
			/>
			<TextField
				name="contactPhone"
				className="mb-4"
				type="tel"
				label="Teléfono"
				validate={validate.contactPhone}
				defaultValue={user?.contactPhone ?? ''}
			/>
			<SubmitButton
				icon={<NavigateNext />}
				iconPlacement="right"
				className="ms-auto"
			>
				Continuar
			</SubmitButton>
		</Form>
	);
}
