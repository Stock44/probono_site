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
		<div className='pt-4'>
			<div className='absolute w-56'>
				<OrganizationDataProgressCard/>
			</div>
			<div className='grow ml-60'>
				<div className='w-full flex'>
					<OrganizationTab label='Información general' className='grow'/>
					<OrganizationTab slug='purpose' label='Propósito' className='grow'/>
					<OrganizationTab slug='address' label='Dirección' className='grow'/>
					<OrganizationTab
						slug='legal'
						label='Datos legales'
						className='grow'
					/>
					<OrganizationTab
						slug='areas'
						label='Zonas de impacto'
						className='grow'
					/>
				</div>
				{children}
			</div>
		</div>
	);
}
