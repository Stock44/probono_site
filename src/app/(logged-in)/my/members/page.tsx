import React from 'react';
import {getUserFromSession, getUsersActiveOrganization} from '@/lib/models/user.ts';
import {getOrganizationOwners} from '@/lib/models/organization.ts';
import UsersList from '@/app/(logged-in)/my/members/users-list.tsx';

export default async function MembersPage() {
	const user = (await getUserFromSession())!;

	const organization = await getUsersActiveOrganization();

	const owners = await getOrganizationOwners(organization.id);

	const ownersWithoutUser = owners.filter(owner => owner.id !== user.id);

	return (
		<div>
			<h1 className='text-stone-200 text-4xl mb-2'>
				Miembros de la organización
			</h1>
			<p className='text-stone-300 mb-4'>
				Aquí puedes controlar quién puede acceder a y modificar los datos de tu organización
			</p>
			<UsersList currentUser={user} users={ownersWithoutUser}/>
		</div>
	);
}
