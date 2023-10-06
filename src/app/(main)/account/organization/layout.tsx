import React from 'react';
import {OrganizationCard} from '@/components/organization-card.tsx';
import {OrganizationDataProgressCard} from '@/app/(main)/account/organization/organization-data-progress-card.tsx';
import OrganizationTab from '@/app/(main)/account/organization/organization-tab.tsx';
import getOrganizationFromSession from '@/lib/get-organization-from-session.ts';

export default async function OrganizationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const organization = await getOrganizationFromSession();
	return (
		<div className='pt-4 flex gap-4'>
			<div className='w-64'>
				<OrganizationCard organization={organization}/>
				<OrganizationDataProgressCard/>
			</div>

			<div className='grow'>
				<div className='w-full flex'>
					<OrganizationTab label='Información general' className='grow'/>
					<OrganizationTab slug='focus' label='Enfoque' className='grow'/>
					<OrganizationTab
						slug='legal'
						label='Datos legales'
						className='grow'
					/>
					<OrganizationTab
						slug='geographic'
						label='Datos geográficos'
						className='grow'
					/>
				</div>
				{children}
			</div>
		</div>
	);
}
