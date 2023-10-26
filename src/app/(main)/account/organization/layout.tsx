import React from 'react';
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
		<div className='pt-4 flex gap-8'>
			<div className='sticky top-0 basis-56 h-full'>
				<OrganizationDataProgressCard/>
			</div>
			<div className='flex-1'>
				<div className='w-full flex mb-8'>
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
