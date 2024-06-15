'use client';

import React from 'react';
import {type User} from '@prisma/client';
import Done from '@material-design-icons/svg/round/done.svg';
import {type UserUpdate, userUpdateSchema} from '@/lib/schemas/user.ts';
import {formValidators} from '@/lib/form-utils.ts';
import {TextField} from 'geostats-ui';

import {FormState, Form, FormHeader} from '@/components/form';

export type AccountFormProps = {
	readonly action: (
		state: FormState<UserUpdate>,
		data: FormData,
	) => Promise<FormState<UserUpdate>>;
	readonly user: User;
	readonly sessionType: string;
};

export default function AccountForm(props: AccountFormProps) {
	const {action, user} = props;

	const validate = formValidators(userUpdateSchema);
	return (
		<Form
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done />,
			}}
			action={action}
		>
			<FormHeader
				title="Mi cuenta"
				description="Aquí puedes actualizar datos sobre tu cuenta."
			/>
			<div className="w-full">
				<div className="mx-auto mb-4 flex-none flex-wrap gap-x-4 min-[467px]:flex">
					<TextField
						isRequired
						label="Nombre(s)"
						name="givenName"
						defaultValue={user.givenName}
						validate={validate.givenName}
						className="mb-2 grow"
					/>
					<TextField
						isRequired
						label="Apellido(s)"
						name="familyName"
						defaultValue={user.familyName}
						validate={validate.familyName}
						className="mb-2 grow "
					/>
				</div>
				<div className="mx-auto mb-4 flex-none flex-wrap gap-x-4 min-[467px]:flex">
					<TextField
						label="Correo electrónico de contacto"
						name="contactEmail"
						defaultValue={user.contactEmail ?? ''}
						validate={validate.contactEmail}
						className="mb-2 grow"
					/>
					<TextField
						label="Télefono de contacto"
						name="contactPhone"
						defaultValue={user.contactPhone ?? ''}
						validate={validate.contactPhone}
						className="mb-2 grow"
					/>
				</div>
			</div>
			{props.sessionType === 'auth0' ? (
				<TextField
					label="Correo electrónico"
					name="email"
					validate={validate.email}
					defaultValue={user.email}
					className="mb-2"
				/>
			) : null}
		</Form>
	);
}
