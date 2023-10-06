'use client';
import React, {useState} from 'react';
import {redirect} from 'next/navigation';
import {ZodError} from 'zod';
import {experimental_useFormStatus as useFormStatus} from 'react-dom';
import {LabeledInput} from '@/components/labeled-input';
import {NumberInput} from '@/components/number-input';
import {Button} from '@/components/button';
import ImageDropArea from '@/components/image-drop-area';
import Icon from '@/components/icon';
import {organizationSchema} from '@/lib/schemas/organization';
import {decodeForm} from '@/lib/schemas/decode-form';
import createOrganizationFromFormAction from '@/app/(onboarding)/onboarding/organization/create-organization-from-form-action';

export default function OrganizationForm() {
	const {pending} = useFormStatus();

	const [issueMap, setIssueMap] = useState(new Map<string, string>());

	async function handleForm(formData: FormData) {
		try {
			// Validate that the data is correct
			await decodeForm(formData, organizationSchema.omit({id: true}));

			const result = await createOrganizationFromFormAction(formData);

			if (result.success) {
				redirect('/account/organization');
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
	}

	return (
		<form
			className='max-w-2xl w-full pt-4 flex flex-wrap items-end gap-x-2'
			action={handleForm}
		>
			<ImageDropArea
				label='Suelta una imagen para tu logo aquí'
				className='basis-full'
				name='logo'
				maxSize={30}
			/>
			<LabeledInput
				required
				label='Nombre'
				name='name'
				issueText={issueMap.get('name')}
				className='grow basis-9/12'
			/>
			<NumberInput
				required
				name='foundingYear'
				label='Año de fundación'
				defaultValue={2023}
				issueText={issueMap.get('foundingYear')}
				className='basis-2/12'
			/>

			<LabeledInput
				label='Teléfono de contacto'
				name='phone'
				type='tel'
				className='flex-initial grow basis-full'
				issueText={issueMap.get('phone')}
			/>
			<LabeledInput
				label='Correo eléctronico de contacto'
				name='email'
				type='email'
				className='flex-initial grow basis-full'
				issueText={issueMap.get('email')}
			/>
			<LabeledInput
				label='Página web'
				name='webpage'
				type='url'
				className='grow basis-full'
				issueText={issueMap.get('webpage')}
			/>

			<Button type='submit' disabled={pending}>
				Continuar <Icon iconName='navigate_next'/>
			</Button>
		</form>
	);
}
