'use client';
import React from 'react';
import {type User} from '@prisma/client';
import Icon from '@/components/icon.tsx';
import upsertUserAction from '@/lib/actions/person.ts';
import TextField from '@/components/text-field.tsx';
import Form from '@/components/form.tsx';
import {personSchema} from '@/lib/schemas/person.ts';
import {formValidators} from '@/lib/schemas/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type PersonFormProps = {
	readonly user?: User;
};

export default function PersonForm(props: PersonFormProps) {
	const {user} = props;

	const validate = formValidators(personSchema);

	return (
		<Form
			action={upsertUserAction} redirectTo='/onboarding/organization'>
			<TextField
				isRequired
				className='mb-4'
				name='givenName'
				label='Nombre(s)'
				validate={validate.givenName}
				defaultValue={user?.givenName}
			/>
			<TextField
				isRequired
				className='mb-4'
				name='familyName'
				label='Apellido(s)'
				validate={validate.familyName}
				defaultValue={user?.familyName}
			/>
			<TextField
				className='mb-4'
				name='contactEmail'
				label='Correo electrónico de contacto'
				validate={validate.contactEmail}
				defaultValue={user?.contactEmail ?? ''}
			/>
			<TextField
				name='phone'
				className='mb-4'
				type='tel'
				label='Teléfono'
				validate={validate.phone}
				defaultValue={user?.phone ?? ''}
			/>
			<SubmitButton>
				Continuar <Icon iconName='navigate_next'/>
			</SubmitButton>
		</Form>
	);
}
