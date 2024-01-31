'use client';

import Save from '@material-design-icons/svg/round/save.svg';
import React, {useState} from 'react';
import Form, {type FormState} from '@/components/form.tsx';
import SubmitButton from '@/components/submit-button.tsx';
import TextField from '@/components/text-field.tsx';
import {formValidators} from '@/lib/form-utils.ts';
import {type PasswordUpdate, passwordUpdateSchema} from '@/lib/schemas/password.ts';

export type PasswordFormProps = {
	readonly action: (state: FormState<PasswordUpdate>, data: FormData) => Promise<FormState<PasswordUpdate>>;
};

export default function PasswordForm(props: PasswordFormProps) {
	const {action} = props;
	const validate = formValidators(passwordUpdateSchema);
	const [password, setPassword] = useState('');
	return (
		<Form
			action={action}>
			<TextField isRequired validate={validate.currentPassword} label='Contraseña actual' name='currentPassword' type='password' className='mb-4'/>
			<TextField isRequired value={password} label='Nueva contraseña' validate={validate.password} name='password' type='password' className='mb-4' onChange={setPassword}/>
			<TextField isRequired label='Confirma la nueva contraseña' type='password' className='mb-4' validate={value => value === password ? true : 'Las contraseñas deben ser iguales'}/>

			<SubmitButton icon={<Save/>}>
				Guardar
			</SubmitButton>
		</Form>

	);
}
