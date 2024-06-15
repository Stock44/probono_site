'use client';
import React from 'react';
import Delete from '@material-design-icons/svg/round/delete.svg';
import Dialog from '@/components/dialog.tsx';
import ModalTrigger from '@/components/modal/modal-trigger.tsx';
import LinkButton from '@/components/button/link-button.tsx';

export default function DeleteDialogTrigger() {
	return (
		<ModalTrigger
			className='mb-4 text-red-500' variant='outlined'
			size='lg' label={
				<>
					<Delete className='me-1 fill-current'/>
					Eliminar cuenta
				</>
			}>
			<Dialog title='Borrar mi cuenta' className='text-red-500'>
				<LinkButton href='/api/auth/reauth?returnTo=/api/account/confirmDeletion' variant='primary' className='bg-red-500 hover:bg-red-400 text-stone-50 hover:text-stone-50'>
					<Delete className='fill-current'/>
					Borrar cuenta
				</LinkButton>
			</Dialog>

		</ModalTrigger>
	);
}
