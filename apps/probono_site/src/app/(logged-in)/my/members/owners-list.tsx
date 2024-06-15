'use client';

import React, {useState} from 'react';
import {type User} from '@prisma/client';
import {
	Cell,
	Column,
	type Key,
	Row,
	type Selection,
	TableBody,
	TableHeader,
} from 'react-stately';
import Add from '@material-design-icons/svg/round/add.svg';
import Delete from '@material-design-icons/svg/round/delete.svg';
import {type OrganizationOwnerAddition} from '@/lib/schemas/organization-owner-addition.ts';
import {type ServerActionResult} from '@/lib/server-action-result.ts';

import {TextField, Button, Table, useToasts, LoadingSpinner, Paper} from 'geostats-ui';
import {Form, FormAction} from '@/components/form';
import {SubmitButton} from '@/components/submit-button.tsx';

export type OwnersListProps = {
	readonly currentUser: User;
	readonly owners: User[];
	readonly addOwnerAction: FormAction<OrganizationOwnerAddition>;
	readonly removeOwnersAction: (
		owners: number[],
	) => Promise<ServerActionResult>;
};

export default function OwnersList(props: OwnersListProps) {
	const {currentUser, owners, addOwnerAction, removeOwnersAction} = props;

	const [selectedUsers, setSelectedUsers] = useState<Selection>(
		new Set<Key>(),
	);

	const columns = [
		{name: 'Nombre(s)', key: 'givenName'},
		{name: 'Apellido(s)', key: 'familyName'},
		{name: 'Correo', key: 'email'},
	];

	const toasts = useToasts();

	const [deletePending, setDeletePending] = useState(false);

	const onRemoveUsers = async () => {
		const usersToRemove =
			selectedUsers === 'all'
				? owners.map(user => user.id)
				: ([...selectedUsers] as number[]);

		setDeletePending(true);

		try {
			const result = await removeOwnersAction(usersToRemove);

			if (result.success) {
				toasts.add(
					{
						title: 'Se han quitado los usuarios exitosamente',
					},
					{
						timeout: 5000,
					},
				);
			} else {
				toasts.add({
					title: result.name ?? 'Ha ocurrido un error',
					description: result.message,
					variant: 'error',
				});
			}
		} catch {
			toasts.add({
				title: 'Ha ocurrido un error',
				variant: 'error',
			});
		}

		setDeletePending(false);
	};

	return (
		<>
			<div className="mb-4 flex items-start gap-4">
				<Form
					action={addOwnerAction}
					className="flex flex-1 items-start gap-4"
					successToast={{
						title: 'Invitación enviada correctamente',
					}}
				>
					<TextField
						className="min-w-0 flex-1"
						placeholder="Ingresa un correo para agregarlo a la organización"
						type="email"
						name="email"
						validate={email =>
							email === currentUser.email
								? 'No te puedes agregar a ti mismo.'
								: undefined
						}
					/>
					<SubmitButton
						variant="secondary"
						className="w-fit"
						icon={<Add className="fill-current" />}
					>
						<span className="hidden md:inline">Agregar</span>
					</SubmitButton>
				</Form>
				<Button
					variant="destructive"
					className="flex-none"
					isDisabled={
						deletePending ||
						(selectedUsers !== 'all' && selectedUsers.size === 0)
					}
					onPress={onRemoveUsers}
				>
					{deletePending ? (
						<LoadingSpinner className="m-1" />
					) : (
						<Delete className="fill-current" />
					)}
				</Button>
			</div>

			<Paper className="min-h-96 overflow-y-auto glow-lg" spacing="none">
				<Table
					showSelectionCheckboxes
					selectedKeys={selectedUsers}
					className="w-full"
					selectionMode="multiple"
					selectionBehavior="toggle"
					onSelectionChange={setSelectedUsers}
				>
					<TableHeader columns={columns}>
						{column => <Column>{column.name}</Column>}
					</TableHeader>
					<TableBody items={owners}>
						{item => (
							<Row>
								{columnKey => (
									<Cell>{item[columnKey as keyof User]}</Cell>
								)}
							</Row>
						)}
					</TableBody>
				</Table>
			</Paper>
		</>
	);
}
