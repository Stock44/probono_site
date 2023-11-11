'use client';
import React, {useState} from 'react';
import {type Person} from '@prisma/client';
import {redirect} from 'next/navigation';
import {useFormState, useFormStatus} from 'react-dom';
import {LabeledInput} from '@/components/labeled-input.tsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import upsertPersonAction from '@/lib/actions/person.ts';
import TextField from '@/components/text-field.tsx';
import Form from '@/components/form.tsx';
import {validators} from '@/lib/schemas/util.ts';
import {personSchema} from '@/lib/schemas/person.ts';

export type PersonFormProps = {
	readonly person?: Person;
};

export default function PersonForm(props: PersonFormProps) {
	const {person} = props;

	const {pending} = useFormStatus();

	const validate = validators(personSchema);

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
			<Button type='submit' isDisabled={pending}>
				Continuar <Icon iconName='navigate_next'/>
			</Button>
		</Form>
	);
}
