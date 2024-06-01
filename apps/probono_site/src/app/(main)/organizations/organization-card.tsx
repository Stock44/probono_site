import React from 'react';
import {type Address, type Organization} from '@prisma/client';
import Image from 'next/image';
import Email from '@material-design-icons/svg/round/email.svg';
import Phone from '@material-design-icons/svg/round/phone.svg';
import LocationOn from '@material-design-icons/svg/round/location_on.svg';
import FacebookLogo from 'public/logos/facebook.png';
import InstagramLogo from 'public/logos/instagram.png';
import XLogo from 'public/logos/x.png';
import TikTokLogo from 'public/logos/tiktok.png';
import LinkedInLogo from 'public/logos/linkedin.png';
import YoutubeLogo from 'public/logos/youtube.png';
import Public from '@material-design-icons/svg/round/public.svg';

import {SocialLink, Paper} from 'geostats-ui';

export type OrganizationCardProps = {
	readonly organization: Organization & {address: Address | null};
};

export default function OrganizationCard(props: OrganizationCardProps) {
	const {organization} = props;

	return (
		<Paper
			hoverEffect
			className='relative flex min-w-64 max-w-96
			flex-1 flex-col gap-4'
		>
			<div className='mb-4 flex items-center gap-4'>
				<div className='size-16 flex-none rounded border border-stone-800 p-4'>
					{organization.logoUrl && (
						<div className='flex size-full items-center justify-center overflow-hidden'>
							<Image
								src={organization.logoUrl}
								alt={organization.name}
								width={64}
								height={64}
								className='size-full object-contain'
							/>
						</div>
					)}
				</div>
				<h2 className='flex-1 truncate text-2xl font-bold'>
					{organization.name}
				</h2>
			</div>
			<div className='grid w-full grow grid-cols-[64px_1fr] gap-4'>
				{organization.email && (
					<>
						<div>
							<Email className='mx-auto fill-current' />
						</div>
						{organization.email}
					</>
				)}

				{organization.phone && (
					<>
						<div>
							<Phone className='mx-auto fill-current' />
						</div>
						{organization.phone}
					</>
				)}

				{organization.webpage && (
					<>
						<div>
							<Public className='mx-auto fill-current' />
						</div>
						{organization.webpage}
					</>
				)}

				{organization.address && (
					<>
						<div>
							<LocationOn className='mx-auto fill-current' />
						</div>
						{organization.address.street}{' '}
						{organization.address.number}
					</>
				)}
			</div>
			<div className='col-span-2 mb-2 mt-4 flex w-full flex-wrap justify-evenly gap-x-2 gap-y-8'>
				{organization.facebook && (
					<SocialLink
						size={16}
						image={FacebookLogo}
						name='Facebook'
						href={`https://www.facebook.com/${organization.facebook}`}
						className='brightness-75 hover:brightness-100'
					/>
				)}
				{organization.instagram && (
					<SocialLink
						size={16}
						image={InstagramLogo}
						name='Instagram'
						href={`https://www.instagram.com/${organization.instagram}`}
						className='brightness-75 hover:brightness-100'
					/>
				)}
				{organization.twitter && (
					<SocialLink
						size={16}
						image={XLogo}
						name='Twitter'
						href={`https://www.twitter.com/${organization.twitter}`}
						className='brightness-75 hover:brightness-100'
					/>
				)}
				{organization.tiktok && (
					<SocialLink
						size={16}
						image={TikTokLogo}
						name='TikTok'
						href={`https://www.tiktok.com/${organization.tiktok}`}
						className='brightness-75 hover:brightness-100'
					/>
				)}
				{organization.linkedIn && (
					<SocialLink
						size={16}
						image={LinkedInLogo}
						name='LinkedIn'
						href={`https://www.linkedin.com/${organization.linkedIn}`}
						className='brightness-75 hover:brightness-100'
					/>
				)}
				{organization.youtube && (
					<SocialLink
						size={16}
						image={YoutubeLogo}
						name='YouTube'
						href={`https://www.youtube.com/${organization.youtube}`}
						className='brightness-75 hover:brightness-100'
					/>
				)}
			</div>
		</Paper>
	);
}
