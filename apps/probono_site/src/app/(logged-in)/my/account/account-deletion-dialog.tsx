'use client';
import React from 'react';
import {useQuery} from 'react-query';
import {type Organization} from '@prisma/client';
import Dialog from 'geostats-ui/dialog.tsx';
import Button from 'geostats-ui/button/button.tsx';
import {useCloseModal} from 'geostats-ui/modal/modal-context.ts';
import ALinkButton from 'geostats-ui/button/a-link-button.tsx';
import LoadingSpinner from 'geostats-ui/loading-spinner.tsx';

export type AccountDeletionDialogProps = {
	readonly userId: number;
};

export default function AccountDeletionDialog(
	props: AccountDeletionDialogProps,
) {
	const {userId} = props;
	const closeModal = useCloseModal();
	const {data} = useQuery<Organization[]>(
		[userId, 'dependant-organizations'],
		async () => {
			const response = await fetch(
				`/api/users/${userId}/dependant-organizations`,
			);

			return response.json();
		},
	);

	return (
		<Dialog title={<span className='text-red-400'>Borrar mi cuenta</span>}>
			¿Estás seguro de que quieres borrar tu cuenta?
			{data ? (
				<div className='mt-4'>
					{data.length > 1 &&
						'Se borrarán las siguientes organizaciones:'}
					{data.length === 1 &&
						'Se borrará la siguiente organización:'}
					<ul className='list-inside list-disc'>
						{data.map(organization => (
							<li key={organization.id}>{organization.name}</li>
						))}
					</ul>
				</div>
			) : (
				<div className='mt-4 flex h-16 items-center justify-center'>
					<LoadingSpinner />
				</div>
			)}
			<div className='mt-4 flex justify-between'>
				<Button variant='secondary' onPress={closeModal}>
					Cancelar
				</Button>
				<ALinkButton
					href='/api/auth/reauth?returnTo=/my/account/delete'
					variant='outlined'
					className='font-bold text-red-400'
				>
					Confirmar
				</ALinkButton>
			</div>
		</Dialog>
	);
}
