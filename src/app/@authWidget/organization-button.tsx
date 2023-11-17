'use client';
import React from 'react';
import {type Organization} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/button.tsx';

export type OrganizationButtonProps = {
	readonly organization: Organization;
};

export default function OrganizationButton(props: OrganizationButtonProps) {
	const {organization} = props;
	return (
		<Link href='/account/organization'>
			<Button variant='outlined'>
				{organization.logoUrl === null ? null : (
					<Image
						src={organization.logoUrl}
						className='rounded-sm me-1'
						height={24}
						width={24}
						alt={organization.name}
					/>
				)}
				{organization.name}
			</Button>
		</Link>
	);
}
