'use client';
import React, {useState} from 'react';
import {type Person} from '@prisma/client';
import {redirect} from 'next/navigation';
import {ZodError} from 'zod';
import {LabeledInput} from '@/components/labeled-input.tsx';
import createPersonFromFormAction from '@/app/(onboarding)/onboarding/person/create-person-from-form-action.ts';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import {decodeForm} from '@/lib/schemas/decode-form.ts';
import {personSchema} from '@/lib/schemas/person.ts';

export default function PersonForm({
	existingPerson,
}: {
	readonly existingPerson?: Partial<Person>;
}) {
	const [issueMap, setIssueMap] = useState(new Map<string, string>());

	const handleForm = async (form: FormData) => {
		try {
			// Validate that the data is correct
			await decodeForm(
				form,
				personSchema.omit({
					id: true,
					email: true,
					authId: true,
				}),
			);

			const result = await createPersonFromFormAction(form);

			if (result.success) {
				redirect('/onboarding/organization');
			}
		} catch (error) {
			if (error instanceof ZodError) {
				setIssueMap(
					new Map(
						error.issues.map(issue => [
							issue.path[0].toString(),
							issue.message,
						]),
					),
				);
			} else {
				throw error;
			}
		}
	};

	return (
		<form action={handleForm} className='w-full'>
			<LabeledInput
				required
				name='givenName'
				label='Nombre (s)'
				issueText={issueMap.get('givenName')}
				defaultValue={existingPerson?.givenName}
			/>
			<LabeledInput
				required
				name='familyName'
				label='Apellido (s)'
				issueText={issueMap.get('familyName')}
				defaultValue={existingPerson?.familyName}
			/>
			<LabeledInput
				name='phone'
				type='tel'
				label='Teléfono'
				issueText={issueMap.get('phone')}
				defaultValue={existingPerson?.phone}
			/>
			<Button type='submit'>
				Continuar <Icon iconName='navigate_next'/>
			</Button>
		</form>
	);
}
