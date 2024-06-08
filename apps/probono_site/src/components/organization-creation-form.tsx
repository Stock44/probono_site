'use client';
import React, {useState} from 'react';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import AddPhotoAlternate from '@material-design-icons/svg/round/add_photo_alternate.svg';
import {NumberField, TextField, Form, type FormState, FileDropZone, SubmitButton} from 'geostats-ui';
import {
	type OrganizationInit,
	organizationInitSchema,
} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';

export type OrganizationCreationFormProps = {
	readonly action: (
		state: FormState<OrganizationInit>,
		data: FormData,
	) => Promise<FormState<OrganizationInit>>;
};

export default function OrganizationCreationForm(
	props: OrganizationCreationFormProps,
) {
	const {action} = props;
	const validate = formValidators(organizationInitSchema);
	const [error, setError] = useState<string>();

	return (
		<Form action={action}>
			<FileDropZone
				acceptedMimeTypes={['image/png', 'image/jpeg', 'image/jpeg']}
				name="logo"
				label={
					<>
						<AddPhotoAlternate className="mx-auto fill-current" />
						<p>Suelta una imagen para tu logo aquí</p>
					</>
				}
				className="mb-4 w-full basis-full"
				error={error}
				onChange={async event => {
					if (event.target.files && event.target.files.length === 0) {
						return;
					}

					const result = await organizationInitSchema
						.unwrap()
						.shape.logo.safeParseAsync(event.target.files![0]);

					if (result.success) {
						setError(undefined);
					} else {
						setError(result.error.issues[0].message);
					}
				}}
			/>
			<div className="flex flex-wrap gap-2">
				<TextField
					isRequired
					label="Nombre"
					name="name"
					validate={validate.name}
					className="mb-4 grow"
				/>
				<NumberField
					isRequired
					name="foundingYear"
					label="Año de fundación"
					defaultValue={2023}
					validate={validate.foundingYear}
					formatOptions={{
						useGrouping: false,
					}}
					className="mb-4 w-full sm:w-32"
				/>
			</div>

			<TextField
				label="Teléfono de contacto"
				name="phone"
				type="tel"
				validate={validate.phone}
				className="mb-4 flex-initial grow basis-full"
			/>
			<TextField
				label="Correo eléctronico de contacto"
				name="email"
				type="email"
				validate={validate.email}
				className="mb-4 flex-initial grow basis-full"
			/>
			<TextField
				label="Página web"
				name="webpage"
				type="url"
				validate={validate.webpage}
				className="mb-4 grow basis-full"
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
