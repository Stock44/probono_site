'use client';
import React from 'react';
import type {Organization} from '@prisma/client';
import {useCloseModal} from '@/components/modal/modal-context.ts';
import Dialog from '@/components/dialog.tsx';
import Button from '@/components/button/button.tsx';
import LoadingSpinner from '@/components/loading-spinner.tsx';

export type OrganizationDeletionDialogProps = {
	readonly deleteOrganization: () => void;
	readonly organization: Organization;
};

export default function OrganizationDeletionDialog(props: OrganizationDeletionDialogProps) {
	const {deleteOrganization, organization} = props;
	const closeModal = useCloseModal();

	return (
		<Dialog title={<span className='text-red-400'>Borrar la organización</span>}>
			¿Estás seguro de que quieres borrar la organización?
			<div className='mt-4'>
				Se borrará la siguiente organización:
				{
					organization
						? <ul className='list-disc list-inside'>
							<li key={organization.id}>
								{organization.name}
							</li>
						</ul>
						: <div className='h-16 flex items-center justify-center mt-4'>
							<LoadingSpinner/>
						</div>
				}
			</div>
			<div className='mt-4 flex justify-between'>
				<Button variant='secondary' onPress={closeModal}>
					Cancelar
				</Button>
				<Button
					variant='outlined' className='text-red-400 font-bold' onPress={async () => {
						await deleteOrganization();
						window.location.href = '/my';
					}}>
					Confirmar
				</Button>
			</div>
		</Dialog>
	);
}

