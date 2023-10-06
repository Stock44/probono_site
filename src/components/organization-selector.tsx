import React from 'react';
import {LinkButton} from '@/components/link-button';

export function OrganizationSelector({
	personOrganizations,
}: {
	readonly personOrganizations: PersonOrganization[];
}) {
	return personOrganizations.length > 0 ? (
		<p>test</p>
	) : (
		<LinkButton
			href='/organizations/create'
			label='Registra tu organización'
			iconName='add'
		/>
	);
}
