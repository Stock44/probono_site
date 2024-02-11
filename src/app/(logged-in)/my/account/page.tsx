import React from 'react';
import {redirect} from 'next/navigation';
import Key from '@material-design-icons/svg/round/key.svg';
import {getSession} from '@auth0/nextjs-auth0';
import Delete from '@material-design-icons/svg/round/delete.svg';
import AccountForm from '@/app/(logged-in)/my/account/account-form.tsx';
import updateUserAction from '@/lib/actions/update-user-action.ts';
import {deleteUser, getUserFromSession} from '@/lib/models/user.ts';
import Separator from '@/components/separator.tsx';
import LinkButton from '@/components/link-button.tsx';
import ModalTrigger from '@/components/modal-trigger.tsx';
import Dialog from '@/components/dialog.tsx';
import DeleteDialogTrigger from '@/components/delete-dialog-trigger.tsx';
import {type UserDelete, userDeleteSchema} from '@/lib/schemas/user.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {authentication} from '@/lib/auth0.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {type FormState} from '@/components/form/form.tsx';

export default async function AccountPage() {
	const session = (await getSession())!;
	const user = await getUserFromSession();
	if (!user) {
		redirect('/onboarding/user');
	}

	return (
		<main>
			<AccountForm action={updateUserAction} user={user}/>
			<Separator/>
			<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
				<LinkButton className='mb-4' variant='outlined' href='/my/account/password' size='lg'>
					<Key className='me-1 fill-current'/>
					Cambiar contraseña
				</LinkButton>
			</div>
			<Separator/>
			<h2 className='font-bold text-4xl text-red-500 mb-4'>
				Eliminar tu cuenta
			</h2>
			<p className='text-stone-300 mb-4'>
				Al eliminar tu cuenta, borrarás toda la información relacionada a esta cuenta.
				Asímismo, se perderán <span className='font-bold'>permanentemente</span> todas las organizaciones que únicamente
				tienen como dueño a esta cuenta.
			</p>
			<LinkButton
				href='/my/account/delete'
				className='mb-4 text-red-500' variant='outlined'
				size='lg'>
				<Delete className='me-1 fill-current'/>
				Eliminar cuenta
			</LinkButton>

		</main>
	);
}
