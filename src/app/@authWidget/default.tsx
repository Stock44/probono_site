import React from 'react';
import OrganizationButton from '@/app/@authWidget/organization-button.tsx';
import UserButtons from '@/app/@authWidget/user-buttons.tsx';
import {getUserWithOrganizationFromSession} from '@/lib/user.ts';

export default async function UserWidgetPage() {
	const user = await getUserWithOrganizationFromSession();
	const organization = user?.organization;

	return (
		<>
			{organization === null || organization === undefined ? null : (
				<OrganizationButton organization={organization}/>
			)}
			<UserButtons user={user ?? undefined}/>
		</>
	);
}
