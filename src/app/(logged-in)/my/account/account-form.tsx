'use client';

import React from 'react';
import {type User} from '@prisma/client';
import Done from '@material-design-icons/svg/round/done.svg';
import {type UserUpdate, userUpdateSchema} from '@/lib/schemas/user.ts';
import Form, {type FormState} from '@/components/form/form.tsx';
import TextField from '@/components/text-field.tsx';
import {formValidators} from '@/lib/form-utils.ts';
import FormHeader from '@/components/form-header.tsx';

export type AccountFormProps = {
	readonly action: (state: FormState<UserUpdate>, data: FormData) => Promise<FormState<UserUpdate>>;
	readonly user: User;
	readonly sessionType: string;
};


function ShowUpdateMail(props: {

	readonly sessionType: string;
	readonly validate: any;
	readonly user: User;
}) {
	if (props.sessionType === 'google') {
		return null;
	}

	return (
		<TextField
			label='Correo electrónico'
			name='email'
			validate={props.validate.email}
			defaultValue={props.user.email}
			className='mb-2'
		/>
	);
}

export default function AccountForm(props: AccountFormProps) {
	const {action, user} = props;
	const sessionType = props.sessionType;

	const validate = formValidators(userUpdateSchema);
	return (
		<Form
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done/>,
			}}
			action={action}>
			<FormHeader title='Mi cuenta' description='Aquí puedes actualizar datos sobre tu cuenta.'/>
			<div className='w-full'>
				<div className='flex-none min-[467px]:flex gap-x-4 mb-4 flex-wrap mx-auto'>
					<TextField isRequired label='Nombre(s)' name='givenName' defaultValue={user.givenName} validate={validate.givenName} className='grow mb-2'/>
					<TextField isRequired label='Apellido(s)' name='familyName' defaultValue={user.familyName} validate={validate.familyName} className='grow mb-2 '/>
				</div>
				<div className='flex-none min-[467px]:flex gap-x-4 mb-4 flex-wrap mx-auto'>
					<TextField label='Correo electrónico de contacto' name='contactEmail' defaultValue={user.contactEmail ?? ''} validate={validate.contactEmail} className='grow mb-2'/>
					<TextField label='Télefono de contacto' name='contactPhone' defaultValue={user.contactPhone ?? ''} validate={validate.contactPhone} className='grow mb-2'/>
				</div>
			</div>

			{ShowUpdateMail({sessionType, validate, user})}

		</Form>

	);
}
