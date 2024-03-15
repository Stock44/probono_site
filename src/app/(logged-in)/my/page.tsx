import React from 'react';
import Image from 'next/image';
import {omit, pick} from 'lodash';
import dynamic from 'next/dynamic';
import Feed from '@material-design-icons/svg/round/feed.svg';
import Psychology from '@material-design-icons/svg/round/psychology.svg';
import Policy from '@material-design-icons/svg/round/policy.svg';
import LocationOn from '@material-design-icons/svg/round/location_on.svg';
import Map from '@material-design-icons/svg/round/map.svg';
import Group from '@material-design-icons/svg/round/group.svg';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';
import {getAddress} from '@/lib/models/address.ts';
import DashboardTile from '@/app/(logged-in)/my/dashboard-tile.tsx';
import SectorsList from '@/app/(logged-in)/my/sectors-list.tsx';
import MembersList from '@/app/(logged-in)/my/members-list.tsx';
import Paper from '@/components/paper/paper.tsx';

const LocationMap = dynamic(async () => import('@/app/(logged-in)/my/location-map.tsx'), {
	ssr: false,
	loading() {
		return (
			<div className='h-48 animate-pulse bg-stone-800 mb-2'/>
		);
	},
});

async function countNullModelAttributes(model: Record<string, unknown> & {
	_count?: Record<string, number>;
}): Promise<[number, number]> {
	let total = 0;
	let nulls = 0;

	if (model._count) {
		for (const value of Object.values(model._count)) {
			total++;
			if (value === 0) {
				nulls++;
			}
		}
	}

	console.log(model);

	for (const value of Object.values(omit(model, ['_count']))) {
		total++;
		if (value === null) {
			nulls++;
		}
	}

	return [nulls, total];
}

export default async function MyStartPage() {
	const organization = await getUsersActiveOrganization({
		include: {
			owners: true,
			sectors: true,
			_count: {
				select: {
					ageGroups: true,
					activities: true,
					beneficiaries: true,
					sectors: true,
				},
			},
		},
	});

	const address = organization.addressId ? await getAddress(organization.addressId) : null;

	const [nulls, totals] = await countNullModelAttributes(omit(organization, ['id', 'wantsToIncorporate', 'approved', 'isIncorporated', 'sectors', 'owners', 'workplaceTypeId', 'hasInvestmentAgreement']));

	const [purposeNulls, purposeTotals] = await countNullModelAttributes(pick(organization, [
		'categoryId',
		'ods',
		'_count',
	]));

	const [generalNulls, generalTotals] = await countNullModelAttributes(pick(organization, [
		'logoUrl',
		'name',
		'foundingYear',
		'phone',
		'email',
		'webpage',
		'employeeCountCategoryId',
		'volunteerCountCategoryId',
		'incomeCategoryId',
		'facebook',
		'instagram',
		'twitter',
		'tiktok',
		'youtube',
		'linkedIn',
	]));

	const [legalNulls, legalTotals] = await countNullModelAttributes(pick(organization, [
		'legalConcept',
		'corporationTypeId',
		'rfc',
		'incorporationYear',
		'cluniStatus',
		'donationAuthStatus',
	]));

	return (
		<main className='w-full'>
			<div className='text-stone-300 w-full grid gap-4 grid-cols-1 md:grid-cols-3'>
				<Paper
					hoverEffect
					className='md:col-span-3 flex gap-8 items-center flex-wrap md:flex-nowrap justify-center md:justify-start '>
<<<<<<< HEAD
				<div
					className='border border-stone-800 p-8 rounded md:col-span-3 flex gap-8 items-center flex-wrap justify-center md:justify-start'>
=======
>>>>>>> c90b635 (Implement new UI improvements and introduce Paper component)
					{
						organization.logoUrl && (
							<Image src={organization.logoUrl} alt='Organization logo' width={64} height={64}/>
						)
					}
					<h1 className='text-stone-200 text-4xl font-bold md:basis-auto truncate'>
						{organization.name}
					</h1>
					<div className='grow hidden md:block'/>
					<div className='basis-5/12 md:basis-auto flex-none'>
						<h3 className='text-sm text-stone-400 text-center md:text-left'>
							Miembro(s)
						</h3>
						<p className='text-2xl font-bold text-center md:text-left'>
							{organization.owners.length}
						</p>
					</div>
					<div className='basis-5/12 md:basis-auto flex-none'>
						<h3 className='text-sm text-stone-400 text-center md:text-left'>
							Campos llenados
						</h3>
						<p className='text-2xl font-bold text-center md:text-left'>
							{totals - nulls} / {totals}
						</p>
					</div>
					<div className='basis-5/12 md:basis-auto flex-none'>
						<h3 className='text-sm text-stone-400 text-center md:text-left'>
							Estatus de aprobación
						</h3>
						<p className='text-2xl font-bold text-center md:text-left'>
							{
								organization.approved
									? 'Aprobada'
									: 'En espera'
							}
						</p>
					</div>

				</Paper>
				<DashboardTile title='Tu información general' href='/my/general' icon={<Feed className='fill-current'/>}>
					<h3 className='text-xs text-stone-400 text-center md:text-left'>
						Campos llenados
					</h3>
					<p className='text-lg font-bold text-center md:text-left'>
						{generalTotals - generalNulls} / {generalTotals}
					</p>
				</DashboardTile>
				<DashboardTile title='Tu propósito' href='/my/purpose' icon={<Psychology className='fill-current'/>}>
					<h3 className='text-xs text-stone-400 text-center md:text-left'>
						Campos llenados
					</h3>
					<p className='text-lg font-bold text-center md:text-left'>
						{purposeTotals - purposeNulls} / {purposeTotals}
					</p>
				</DashboardTile>
				<DashboardTile title='Tus datos legales' href='/my/legal' icon={<Policy className='fill-current'/>}>
					<h3 className='text-xs text-stone-400 text-center md:text-left'>
						Campos llenados
					</h3>
					<p className='text-lg font-bold text-center md:text-left'>
						{legalTotals - legalNulls} / {legalTotals}
					</p>
				</DashboardTile>
				<DashboardTile title='Tu ubicación' href='/my/location' icon={<LocationOn className='fill-current'/>}>
					{
						address
							? (
								<>
									<div className='rounded overflow-hidden'>
										<LocationMap location={address.location} className='h-48 mb-4'/>
									</div>
									<p className='text-base'>
										{address.street} {address.number}
									</p>
								</>

							)
							: (
								<p>
									No llenado
								</p>
							)
					}
				</DashboardTile>
				<DashboardTile title='Tu alcance geográfico' href='/my/sectors' icon={<Map className='fill-current'/>}>
					{
						organization.sectors.length === 0
							? (
								<h3 className='font-bold md:text-left'>
									No has agregado sectores.
								</h3>
							)
							: (
								<SectorsList sectors={organization.sectors}/>
							)
					}

				</DashboardTile>
				<DashboardTile title='Miembros' href='/my/members' icon={<Group className='fill-current'/>}>
					<MembersList members={organization.owners}/>
				</DashboardTile>
			</div>
		</main>
	);
}
