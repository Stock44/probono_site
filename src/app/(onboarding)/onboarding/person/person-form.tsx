'use client';
import React from 'react';
import {type Person} from '@prisma/client';
import Icon from '@/components/icon.tsx';
import upsertPersonAction from '@/lib/actions/person.ts';
import TextField from '@/components/text-field.tsx';
import Form from '@/components/form.tsx';
import {personSchema} from '@/lib/schemas/person.ts';
import {formValidators} from '@/lib/schemas/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type PersonFormProps = {
	readonly person?: Person;
};

export default function PersonForm(props: PersonFormProps) {
	const {person} = props;

	const validate = formValidators(personSchema);

	return (
		<Form
			action={upsertPersonAction} redirectTo='/onboarding/organization'>
			<TextField
				isRequired
				className='mb-4'
				name='givenName'
				label='Nombre(s)'
				validate={validate.givenName}
				defaultValue={person?.givenName}
			/>
			<TextField
				isRequired
				className='mb-4'
				name='familyName'
				label='Apellido(s)'
				validate={validate.familyName}
				defaultValue={person?.familyName}
			/>
			<TextField
				className='mb-4'
				name='contactEmail'
				label='Correo electrónico de contacto'
				validate={validate.contactEmail}
				defaultValue={person?.contactEmail ?? ''}
			/>
			<TextField
				name='phone'
				className='mb-4'
				type='tel'
				label='Teléfono'
				validate={validate.phone}
				defaultValue={person?.phone ?? ''}
			/>
			<SubmitButton>
				Continuar <Icon iconName='navigate_next'/>
			</SubmitButton>
		</Form>
	);
}
