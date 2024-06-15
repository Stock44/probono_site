import React from 'react';
import dynamic from 'next/dynamic';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';
import OrganizationCard from '@/app/(main)/organizations/organization-card.tsx';

const LocationMap = dynamic(
	async () => import('@/app/(main)/organizations/location-map.tsx'),
	{
		ssr: false,
		loading() {
			return (
				<div className='h-96 w-full animate-pulse rounded-md bg-stone-900' />
			);
		},
	},
);

export default async function OrganizationsPage() {
	const organizations = await getApprovedOrganizationInfo();

	const organizationsWithAddresses = organizations.filter(organization =>
		Boolean(organization.location),
	) as Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;

	return (
		<main className='mx-auto min-h-screen max-w-screen-xl px-4 py-16'>
			<h1 className='mb-6 mt-4 text-4xl text-stone-50'>Organizaciones</h1>
			<div className='mb-8 h-96 w-full overflow-hidden rounded-md glow-2xl'>
				<LocationMap
					organizations={organizationsWithAddresses}
					className='size-full'
				/>
			</div>
			<div className='flex flex-wrap gap-8'>
				{organizations.map(organization => (
					<OrganizationCard
						key={organization.id}
						organization={organization}
					/>
				))}
			</div>
		</main>
	);
}
