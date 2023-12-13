'use client';

import React from 'react';
import {type Organization} from '@prisma/client';
import {Item} from 'react-stately';
import {
	notFound, usePathname,
	useRouter,
	useSearchParams,
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from 'next/navigation';
import Image from 'next/image';
import invariant from 'ts-tiny-invariant';
import Select from '@/components/select.tsx';

export type OrganizationSelectProps = {
	readonly organizations: Array<Pick<Organization, 'name' | 'logoUrl' | 'id'>>;
};

export default function OrganizationSelect(props: OrganizationSelectProps) {
	const {organizations} = props;

	invariant(organizations.length > 0);

	const searchParameters = useSearchParams();
	let selectedOrganizationId = searchParameters.get('organization') ?? organizations[0].id;
	if (typeof selectedOrganizationId === 'string') {
		selectedOrganizationId = Number.parseInt(selectedOrganizationId, 10);
	}

	if (Number.isNaN(selectedOrganizationId)) {
		notFound();
	}

	const router = useRouter();
	const pathname = usePathname();

	return (
		<Select
			aria-label='Selecciona la organización a ver.'
			items={organizations}
			popoverPlacement='bottom end'
			placeholder='Selecciona una organización'
			selectedKey={selectedOrganizationId} onSelectionChange={id => {
				router.push(`${pathname}?organization=${id}`);
			}}>
			{
				organization => (
					<Item textValue={organization.name}>
						{
							organization.logoUrl
								? (
									<Image src={organization.logoUrl} alt={`${organization.name} logo`} width={16} height={16} className='w-5 h-5 me-1 inline'/>
								)
								: <span className='w-4 h-4 me-1'>
									as
								</span>
						}
						{organization.name}
					</Item>
				)
			}
		</Select>
	);
}
