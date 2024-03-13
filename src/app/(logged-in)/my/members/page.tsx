import React from 'react';
import {getUserFromSession, getUsersActiveOrganization} from '@/lib/models/user.ts';
import {getOrganizationOwners} from '@/lib/models/organization.ts';
import OwnersList from '@/app/(logged-in)/my/members/owners-list.tsx';
import addOrganizationOwnerAction from '@/lib/actions/add-organization-owner-action.ts';
import removeOrganizationOwnersAction from '@/lib/actions/remove-organization-owners-action.ts';
import {
	getActiveOrganizationInvitations,
	getExpiredOrganizationInvitations,
} from '@/lib/models/organization-invitation.ts';
import InvitationList from '@/app/(logged-in)/my/members/invitation-list.tsx';

export default async function MembersPage() {
	const user = (await getUserFromSession())!;

	const organization = await getUsersActiveOrganization();

	const activeInvites = await getActiveOrganizationInvitations(organization.id);

	const expiredInvites = await getExpiredOrganizationInvitations(organization.id);

	const owners = await getOrganizationOwners(organization.id);

	const ownersWithoutUser = owners.filter(owner => owner.id !== user.id);

	const addOwnerAction = addOrganizationOwnerAction.bind(null, organization.id);

	const removeOwnersAction = removeOrganizationOwnersAction.bind(null, organization.id);

	return (
		<main className='w-full'>
			<h1 className='text-stone-200 text-4xl mb-2'>
				Miembros de la organización
			</h1>
			<p className='text-stone-300 mb-4'>
				Aquí puedes controlar quién puede acceder a y modificar los datos de tu organización
			</p>
			<OwnersList currentUser={user} owners={ownersWithoutUser} addOwnerAction={addOwnerAction} removeOwnersAction={removeOwnersAction}/>

			{
				expiredInvites.length + activeInvites.length > 0 && (
					<>
						<h2 className='text-stone-200 text-2xl mt-8 mb-4'>
							Invitaciones enviadas
						</h2>
						<InvitationList className='mb-4' activeInvites={activeInvites} expiredInvites={expiredInvites}/>
					</>
				)
			}
		</main>
	);
}
