'use client';

import React, {useState} from 'react';
import {type User} from '@prisma/client';
import {Cell, Column, type Key, Row, type Selection, TableBody, TableHeader} from 'react-stately';
import Add from '@material-design-icons/svg/round/add.svg';
import Delete from '@material-design-icons/svg/round/delete.svg';
import TextField from '@/components/text-field.tsx';
import Button from '@/components/button.tsx';
import Table from '@/components/table/table.tsx';

export type UsersListProps = {
	readonly currentUser: User;
	readonly users: User[];
};

export default function UsersList(props: UsersListProps) {
	const {
		currentUser,
		users,
	} = props;

	const [selectedUsers, setSelectedUsers] = useState<Selection>(new Set<Key>());

	const columns = [
		{name: 'Nombre(s)', key: 'givenName'},
		{name: 'Apellido(s)', key: 'familyName'},
		{name: 'Correo', key: 'email'},
	];

	return (
		<>
			<div className='flex items-stretch gap-4 mb-4'>
				<TextField className='flex-1 min-w-0 overflow-hidden' placeholder='Correo electrónico del usuario' type='email'/>
				<Button variant='secondary' size='sm'>
					<Add className='fill-current'/> <span className='hidden md:inline'>Agregar</span>
				</Button>
				<Button variant='destructive' size='sm' isDisabled={selectedUsers !== 'all' && selectedUsers.size === 0}>
					<Delete className='fill-current'/>
				</Button>
			</div>

			<div className='border border-stone-700 rounded min-h-96 text-stone-300 overflow-y-auto'>
				<Table showSelectionCheckboxes className='w-full' selectionMode='multiple' selectionBehavior='toggle'>
					<TableHeader columns={columns}>
						{
							column => (
								<Column>
									{column.name}
								</Column>
							)
						}
					</TableHeader>
					<TableBody items={[currentUser, currentUser, currentUser]}>
						{
							item => (
								<Row>
									{
										columnKey => (
											<Cell>
												{item[columnKey as keyof User]}
											</Cell>
										)
									}
								</Row>
							)
						}
					</TableBody>
				</Table>
			</div>
		</>

	);
}
