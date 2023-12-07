'use client';

import React from 'react';
import {type Organization} from '@prisma/client';
import {Item} from 'react-stately';
import {useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments} from 'next/navigation';
import Image from 'next/image';
import Select from '@/components/select.tsx';

export type OrganizationSelectProps = {
	readonly organizations: Array<Pick<Organization, 'name' | 'logoUrl' | 'id'>>;
};

export default function OrganizationSelect(props: OrganizationSelectProps) {
	const {organizations} = props;

	const selectedOrganization = useSelectedLayoutSegments();
	const router = useRouter();

	return (
		<Select
			aria-label='Selecciona la organización a ver.'
			popoverPlacement='bottom end'
			placeholder='Selecciona una organización'
			selectedKey={selectedOrganization[1]} onSelectionChange={id => {
				router.push(id.toString());
			}}>
			{
				organizations.map(organization => (
					<Item key={organization.id} textValue={organization.name}>
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
				))
			}
		</Select>
	);
}
