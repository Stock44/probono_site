'use client';

import Save from '@material-design-icons/svg/round/save.svg';
import React from 'react';
import {type User} from '@prisma/client';
import Done from '@material-design-icons/svg/round/done.svg';
import Key from '@material-design-icons/svg/round/key.svg';
import Alert from '@material-design-icons/svg/round/delete.svg';
import {type UserUpdate, userUpdateSchema} from '@/lib/schemas/user.ts';
import Form, {type FormState} from '@/components/form/form.tsx';
import SubmitButton from '@/components/submit-button.tsx';
import TextField from '@/components/text-field.tsx';
import {formValidators} from '@/lib/form-utils.ts';
import Separator from '@/components/separator.tsx';
import LinkButton from '@/components/link-button.tsx';

export type AccountFormProps = {
	readonly action: (state: FormState<UserUpdate>, data: FormData) => Promise<FormState<UserUpdate>>;
	readonly user: User;
};

export default function AccountForm(props: AccountFormProps) {
	const {action, user} = props;
	const validate = formValidators(userUpdateSchema);
	return (
		<Form
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done/>,
			}}
			action={action}>
			<div className='flex items-end mb-4 gap-4 flex-wrap'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Mi cuenta
					</h1>
					<p className='text-stone-300'>
						Aquí puedes actualizar datos sobre tu cuenta.
					</p>
				</div>
				<div className='grow'/>
				<SubmitButton icon={<Save/>}>
					Guardar
				</SubmitButton>
			</div>
			<div/>
			<div className='w-full'>
				<div className='flex-none min-[482px]:flex gap-x-4 mb-4 flex-wrap mx-auto'>
					<TextField isRequired label='Nombre(s)' name='givenName' defaultValue={user.givenName} validate={validate.givenName} className='grow mb-2'/>
					<TextField isRequired label='Apellido(s)' name='familyName' defaultValue={user.familyName} validate={validate.familyName} className='grow mb-2 '/>
				</div>
				<div className='flex-none min-[482px]:flex gap-x-4 mb-4 flex-wrap mx-auto'>
					<TextField label='Correo electrónico de contacto' name='contactEmail' defaultValue={user.contactEmail ?? ''} validate={validate.contactEmail} className='grow mb-2'/>
					<TextField label='Télefono de contacto' name='contactPhone' defaultValue={user.contactPhone ?? ''} validate={validate.contactPhone} className='grow mb-2'/>
				</div>
			</div>

			<TextField label='Correo electrónico' name='email' validate={validate.email} defaultValue={user.email} className='mb-2'/>

		</Form>

	);
}
