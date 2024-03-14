import React from 'react';
import dynamic from 'next/dynamic';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';
import OrganizationCard from '@/app/(main)/organizations/organization-card.tsx';

const LocationMap = dynamic(async () => import('@/app/(main)/organizations/location-map.tsx'), {
	ssr: false,
	loading() {
		return (
			<div className='h-96 w-full animate-pulse bg-stone-900 rounded-md'/>
		);
	},
});

export default async function OrganizationsPage() {
	const organizations = await getApprovedOrganizationInfo();

	const organizationsWithAddresses = organizations
		.filter(organization => Boolean(organization.location)) as Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;

	return (
		<main className='max-w-screen-xl min-h-screen mx-auto py-16 px-4'>
			<div className='w-full h-96 mt-4 mb-8 rounded-md overflow-hidden shadow-[0px_0px_64px_8px_theme(colors.stone.800)]'>
				<LocationMap organizations={organizationsWithAddresses} className='h-full w-full'/>
			</div>
			<h1 className='text-4xl text-stone-50 mb-6'>
				Organizaciones
			</h1>
			<div className='flex flex-wrap gap-8'>
				{
					organizations.map(organization => (
						<OrganizationCard key={organization.id} organization={organization}/>
					))
				}
			</div>
		</main>
	);
}
