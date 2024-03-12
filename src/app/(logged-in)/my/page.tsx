import React from 'react';
import Image from 'next/image';
import {omit, pick} from 'lodash';
import {getUsersActiveOrganization} from '@/lib/models/user.ts';

async function countNullModelAttributes(model: Record<string, unknown> & {
	id: unknown;
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

	for (const value of Object.values(omit(model, ['_count', 'id']))) {
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
			address: true,
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

	const [nulls, totals] = await countNullModelAttributes(omit(organization, ['approved', 'isIncorporated']));

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
				<div
					className='border border-stone-700 p-8 rounded md:col-span-3 flex gap-8 items-center flex-wrap justify-center md:justify-start'>
					{
						organization.logoUrl && (
							<Image src={organization.logoUrl} alt='Organization logo' width={64} height={64}/>
						)
					}
					<h1 className='text-stone-200 text-4xl font-bold basis-5/12 md:basis-auto'>
						{organization.name}
					</h1>
					<div className='grow hidden md:block'/>
					<div className='basis-5/12 md:basis-auto'>
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
					<div className='basis-5/12 md:basis-auto'>
						<h3 className='text-sm text-stone-400 text-center md:text-left'>
							Campos llenados
						</h3>
						<p className='text-2xl font-bold text-center md:text-left'>
							{totals - nulls} / {totals}
						</p>
					</div>
				</div>
				<div className='border border-stone-700 p-4 rounded'>
					<h2 className='text-stone-200 font-bold mb-2'>
						Información general
					</h2>
					<h3 className='text-xs text-stone-400 text-center md:text-left'>
						Campos llenados
					</h3>
					<p className='text-lg font-bold text-center md:text-left'>
						{generalTotals - generalNulls} / {generalTotals}
					</p>
				</div>
				<div className='border border-stone-700 p-4 rounded'>
					<h2 className='text-stone-200 font-bold mb-2'>
						Tu propósito
					</h2>
					<h3 className='text-xs text-stone-400 text-center md:text-left'>
						Campos llenados
					</h3>
					<p className='text-lg font-bold text-center md:text-left'>
						{purposeTotals - purposeNulls} / {purposeTotals}
					</p>
				</div>
				<div className='border border-stone-700 p-4 rounded'>
					<h2 className='text-stone-200 font-bold mb-2'>
						Tus datos legales
					</h2>
					<h3 className='text-xs text-stone-400 text-center md:text-left'>
						Campos llenados
					</h3>
					<p className='text-lg font-bold text-center md:text-left'>
						{legalTotals - legalNulls} / {legalTotals}
					</p>
				</div>
				<div className='border border-stone-700 p-4 rounded'>
					<h2 className='text-stone-200 font-bold mb-2'>
						Tu ubicación
					</h2>
					{
						organization.address
							? (
								<div>
									{organization.address.number} {organization.address.street}
								</div>
							)
							: (
								<p>
									No llenado
								</p>
							)
					}
				</div>
				<div className='border border-stone-700 p-4 rounded'>
					<h2 className='text-stone-200 font-bold mb-2'>
						Tu alcance geográfico
					</h2>
					<h3 className='font-bold md:text-left'>
						{organization._count.sectors} sectores
					</h3>
				</div>
			</div>
		</main>
	);
}
