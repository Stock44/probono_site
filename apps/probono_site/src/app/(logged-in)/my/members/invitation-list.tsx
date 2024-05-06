'use client';
import React from 'react';
import {type OrganizationInvitation} from '@prisma/client';
import {Cell, Column, Row, TableBody, TableHeader} from 'react-stately';
import {List} from 'immutable';
import Table from 'geostats-ui/table/table.tsx';
import {cx} from '@/lib/cva.ts';

export type InvitationListProps = {
	readonly activeInvites: OrganizationInvitation[];
	readonly expiredInvites: OrganizationInvitation[];
	readonly className?: string;
};

export default function InvitationList(props: InvitationListProps) {
	const {activeInvites, expiredInvites, className} = props;

	const invites = List([
		...activeInvites.map(invite => ({
			...invite,
			active: true,
		})),
		...expiredInvites.map(invite => ({
			...invite,
			active: false,
		})),
	]);

	const columns = [
		{
			name: 'Correo electrónico',
			key: 'recipient',
		},
		{
			name: 'Estado',
			key: 'active',
		},
	];

	const partitionedInvites = invites.groupBy(invite => invite.recipient);

	const latestInvites = partitionedInvites
		.map(invites => invites.maxBy(invite => invite.timestamp)!)
		.toList();

	return (
		<div
			className={cx(
				'border border-stone-700 rounded min-h-48 text-stone-300 overflow-y-auto',
				className,
			)}
		>
			<Table showSelectionCheckboxes className='w-full'>
				<TableHeader columns={columns}>
					{column => <Column>{column.name}</Column>}
				</TableHeader>
				<TableBody items={latestInvites}>
					{item => (
						<Row>
							{columnKey => (
								<Cell>
									{columnKey === 'active'
										? item.active
											? 'Activa'
											: 'Inactiva'
										: item[columnKey as 'recipient']}
								</Cell>
							)}
						</Row>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
