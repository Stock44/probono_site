'use client';
import React from 'react';
import {NumberField} from '@/components/number-field.tsx';
import Icon from '@/components/icon.tsx';
import TextField from '@/components/text-field.tsx';
import Form from '@/components/form.tsx';
import FileDropZone from '@/components/file-drop-zone.tsx';
import upsertOrganizationAction from '@/lib/actions/organization.ts';
import {organizationSchema} from '@/lib/schemas/organization-init.ts';
import {formValidators} from '@/lib/schemas/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

export default function OrganizationForm() {
	const validate = formValidators(organizationSchema);

	return (
		<Form
			action={upsertOrganizationAction}
			redirectTo='/my'
		>
			<FileDropZone
				acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpeg']}
				validate={validate.logo}
				name='logo'
				label='Suelta una imagen para tu logo aquí'
				className='basis-full mb-4 w-full'
			/>
			<div className='flex gap-2'>
				<TextField
					isRequired
					label='Nombre'
					name='name'
					validate={validate.name}
					className='grow basis-9/12 mb-4'
				/>
				<NumberField
					isRequired
					name='foundingYear'
					label='Año de fundación'
					defaultValue={2023}
					validate={validate.foundingYear}
					formatOptions={{
						useGrouping: false,
					}}
					className='w-32 mb-4'
				/>
			</div>

			<TextField
				label='Teléfono de contacto'
				name='phone'
				type='tel'
				validate={validate.phone}
				className='flex-initial grow basis-full mb-4'
			/>
			<TextField
				label='Correo eléctronico de contacto'
				name='email'
				type='email'
				validate={validate.email}
				className='flex-initial grow basis-full mb-4'
			/>
			<TextField
				label='Página web'
				name='webpage'
				type='url'
				validate={validate.webpage}
				className='grow basis-full mb-4'
			/>

			<SubmitButton>
				Continuar <Icon name='navigate_next'/>
			</SubmitButton>
		</Form>
	);
}
