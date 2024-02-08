'use client';
import React, {useState} from 'react';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import AddPhotoAlternate from '@material-design-icons/svg/round/add_photo_alternate.svg';
import {NumberField} from '@/components/number-field.tsx';
import TextField from '@/components/text-field.tsx';
import Form, {type FormState} from '@/components/form/form.tsx';
import FileDropZone from '@/components/file-drop-zone.tsx';
import {type OrganizationInit, organizationInitSchema} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type OrganizationCreationFormProps = {
	readonly action: (state: FormState<OrganizationInit>, data: FormData) => Promise<FormState<OrganizationInit>>;
};

export default function OrganizationCreationForm(props: OrganizationCreationFormProps) {
	const {action} = props;
	const validate = formValidators(organizationInitSchema);
	const [error, setError] = useState<string>();

	return (
		<Form
			action={action}
		>
			<FileDropZone
				acceptedMimeTypes={['image/png', 'image/jpeg', 'image/jpeg']}
				name='logo'
				label={
					<>
						<AddPhotoAlternate className='fill-current mx-auto'/>
						<p>Suelta una imagen para tu logo aquí</p>
					</>
				}
				className='basis-full mb-4 w-full'
				error={error}
				onChange={async event => {
					if (event.target.files && event.target.files.length === 0) {
						return;
					}

					const result = await organizationInitSchema.unwrap().shape.logo.safeParseAsync(event.target.files![0]);

					if (result.success) {
						setError(undefined);
					} else {
						setError(result.error.issues[0].message);
					}
				}}
			/>
			<div className='flex gap-2 flex-wrap'>
				<TextField
					isRequired
					label='Nombre'
					name='name'
					validate={validate.name}
					className='grow mb-4'
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
					className='w-full sm:w-32 mb-4'
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
