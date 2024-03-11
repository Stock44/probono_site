import React from 'react';
import {redirect} from 'next/navigation';
import Key from '@material-design-icons/svg/round/key.svg';
import Delete from '@material-design-icons/svg/round/delete.svg';
import dynamic from 'next/dynamic';
import AccountForm from '@/app/(logged-in)/my/account/account-form.tsx';
import updateUserAction from '@/lib/actions/update-user-action.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import Separator from '@/components/separator.tsx';
import LinkButton from '@/components/button/link-button.tsx';
import ModalTrigger from '@/components/modal/modal-trigger.tsx';
import HashSpyToaster from '@/components/hash-spy-toaster.tsx';

const AccountDeletionDialog = dynamic(
	async () =>
		import('@/app/(logged-in)/my/account/account-deletion-dialog.tsx'),
);

export default async function AccountPage() {
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
			<h2 className='font-bold text-4xl text-red-400 mb-4'>
				Eliminar tu cuenta
			</h2>
			<p className='text-stone-300 mb-4'>
				Al eliminar tu cuenta, borrarás toda la información relacionada a esta cuenta.
				Asímismo, se perderán <span className='font-bold'>permanentemente</span> todas las organizaciones que únicamente
				tienen como dueño a esta cuenta.
			</p>
			<ModalTrigger
				isDismissable
				className='text-red-400'
				variant='outlined'
				size='lg'
				label={
					<>
						<Delete className='me-1 fill-current'/>
						Eliminar cuenta
					</>
				}>
				<AccountDeletionDialog userId={user.id}/>
			</ModalTrigger>

			<HashSpyToaster
				toast={{
					title: 'Tiempo de autenticación excedido, intentálo nuevamente.',
					variant: 'error',
				}} hash='expired'/>
			<HashSpyToaster
				toast={{
					title: 'No se ha podido borrar tu cuenta, intentálo nuevamente.',
					variant: 'error',
				}} hash='unknown-error'/>
			<HashSpyToaster
				toast={{
					title: 'Necesitas autenticarte primero.',
					variant: 'error',
				}} hash='no-reauth'/>
		</main>
	);
}
