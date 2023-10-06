import {type Organization} from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import Icon from '@/components/icon.tsx';

export function OrganizationCard({
	organization,
}: {
	readonly organization: Organization;
}) {
	return (
		<div className='border-stone-800 border rounded p-4'>
			{organization.logoUrl === null ? (
				<div className='w-24 h-24 bg-stone-900 text-stone-50 text-4xl rounded flex items-center justify-center'>
					{organization.name.slice(0, 2)}
				</div>
			) : (
				<Image
					src={organization.logoUrl}
					width={96}
					height={96}
					alt={organization.name}
					className='mb-4'
				/>
			)}
			<h2 className='text-stone-300 text-xl font-bold mb-4'>
				{organization.name}
			</h2>
			{organization.phone === null ? null : (
				<p className='text-stone-300 flex gap-2 mb-4 text-sm'>
					<Icon iconName='phone'/>
					{organization.phone}
				</p>
			)}
			{organization.email === null ? null : (
				<p className='text-stone-300 flex gap-2 text-sm'>
					<Icon iconName='email'/>
					{organization.email}
				</p>
			)}
		</div>
	);
}
