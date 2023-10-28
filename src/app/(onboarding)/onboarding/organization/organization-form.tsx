'use client';
import React, {useState} from 'react';
import {redirect} from 'next/navigation';
import {ZodError} from 'zod';
import {useFormStatus} from 'react-dom';
import {NumberField} from '@/components/number-field.tsx';
import Button from '@/components/button.tsx';
import ImageDropZone from '@/components/image-drop-zone.tsx';
import Icon from '@/components/icon.tsx';
import {organizationSchema} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/schemas/decode-form.ts';
import createOrganizationFromFormAction from '@/app/(onboarding)/onboarding/organization/create-organization-from-form-action.ts';
import TextField from '@/components/text-field.tsx';

export default function OrganizationForm() {
	const {pending} = useFormStatus();

	const [fileUrl, setFileUrl] = useState<string>();

	const [issueMap, setIssueMap] = useState(new Map<string, string>());

	const handleForm = async (formData: FormData) => {
		try {
			// Validate that the data is correct
			await decodeForm(formData, organizationSchema.omit({id: true}));

			if (fileUrl !== undefined) {
				const logoImage = (await fetch(fileUrl).then(async r => r.blob()));
				formData.append('logo', logoImage);
			}

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
	};

	return (
		<form
			className='max-w-2xl w-full pt-4 items-end gap-x-2'
			action={handleForm}
		>
			<ImageDropZone
				label='Suelta una imagen para tu logo aquí'
				className='basis-full h-32 mb-4 w-full'
				fileUrl={fileUrl}
				maxSize={30}
				onFileChange={setFileUrl}
			/>
			<div className='flex gap-2'>
				<TextField
					isRequired
					label='Nombre'
					name='name'
					errorMessage={issueMap.get('name')}
					className='grow basis-9/12 mb-4'
				/>
				<NumberField
					isRequired
					name='foundingYear'
					label='Año de fundación'
					defaultValue={2023}
					errorMessage={issueMap.get('foundingYear')}
					formatOptions={{
						useGrouping: false,
					}}
					className='w-28 mb-4'
				/>
			</div>

			<TextField
				label='Teléfono de contacto'
				name='phone'
				type='tel'
				className='flex-initial grow basis-full mb-4'
				errorMessage={issueMap.get('phone')}
			/>
			<TextField
				label='Correo eléctronico de contacto'
				name='email'
				type='email'
				className='flex-initial grow basis-full mb-4'
				errorMessage={issueMap.get('email')}
			/>
			<TextField
				label='Página web'
				name='webpage'
				type='url'
				className='grow basis-full mb-4'
				errorMessage={issueMap.get('webpage')}
			/>

			<Button type='submit' isDisabled={pending}>
				Continuar <Icon iconName='navigate_next'/>
			</Button>
		</form>
	);
}
