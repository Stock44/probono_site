'use client';
import React from 'react';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import AddPhotoAlternate from '@material-design-icons/svg/round/add_photo_alternate.svg';
import {NumberField} from '@/components/number-field.tsx';
import TextField from '@/components/text-field.tsx';
import Form, {type FormState} from '@/components/form.tsx';
import FileDropZone from '@/components/file-drop-zone.tsx';
import {type OrganizationInit, organizationInitSchema} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type OrganizationFormProps = {
	readonly action: (state: FormState<OrganizationInit>, data: FormData) => Promise<FormState<OrganizationInit>>;
};

export default function OrganizationForm(props: OrganizationFormProps) {
	const {action} = props;
	const validate = formValidators(organizationInitSchema);

	return (
		<Form
			action={action}
		>
			<FileDropZone
				acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpeg']}
				validate={validate.logo}
				name='logo'
				label={
					<>
						<AddPhotoAlternate className='fill-current mx-auto'/>
						<p>Suelta una imagen para tu logo aquí</p>
					</>
				}
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

			<SubmitButton icon={<NavigateNext/>} iconPlacement='right' className='ms-auto'>
				Continuar
			</SubmitButton>
		</Form>
	);
}
