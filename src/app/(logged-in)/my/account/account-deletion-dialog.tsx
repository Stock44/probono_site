'use client';
import React from 'react';
import {useQuery} from 'react-query';
import {type Organization} from '@prisma/client';
import Dialog from '@/components/dialog.tsx';
import Button from '@/components/button.tsx';
import {useCloseModal} from '@/components/modal/modal-context.ts';
import ALinkButton from '@/components/a-link-button.tsx';

export type AccountDeletionDialogProps = {
	readonly userId: number;
};

export default function AccountDeletionDialog(props: AccountDeletionDialogProps) {
	const {userId} = props;
	const closeModal = useCloseModal();
	const {data} = useQuery<Organization[]>([userId, 'dependant-organizations'], async () => {
		const response = await fetch(`/api/users/${userId}/dependant-organizations`);

		return response.json();
	});

	return (
		<Dialog title={<span className='text-red-400'>Borrar mi cuenta</span>}>
			¿Estás seguro de que quieres borrar tu cuenta?
			{
				data && (
					<div className='mt-4'>
						{data.length > 1 && 'Se borrarán las siguientes organizaciones:'}
						{data.length === 1 && 'Se borrará la siguiente organización:'}
						<ul className='list-disc list-inside'>
							{
								data.map(organization => (
									<li key={organization.id}>
										{organization.name}
									</li>
								))
							}
						</ul>
					</div>
				)
			}
			<div className='mt-4 flex justify-between'>
				<Button variant='secondary' onPress={closeModal}>
					Cancelar
				</Button>
				<ALinkButton href={`/api/auth/reauth?returnTo=/api/users/${userId}/delete`} variant='outlined' className='text-red-400 font-bold'>
					Confirmar
				</ALinkButton>
			</div>

		</Dialog>
	);
}
