import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Email from '@material-design-icons/svg/round/email.svg';
import Phone from '@material-design-icons/svg/round/phone.svg';
import LocationOn from '@material-design-icons/svg/round/location_on.svg';
import YoutubeLogo from 'public/logos/youtube.png';
import XLogo from 'public/logos/x.png';
import TikTokLogo from 'public/logos/tiktok.png';
import LinkedInLogo from 'public/logos/linkedin.png';
import InstagramLogo from 'public/logos/instagram.png';
import FacebookLogo from 'public/logos/facebook.png';
import SocialLink from '@/components/social-link.tsx';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';

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
						<div
							key={organization.id}
							className='flex-1 text-stone-300 border border-stone-800 rounded p-4 grid grid-cols-[64px_1fr] auto-rows-min items-center gap-x-4 gap-y-4 max-w-96'>
							<div className='w-16 h-16 border border-stone-800 rounded p-4'>
								{
									organization.logoUrl && (
										<div className='overflow-hidden h-full w-full flex items-center justify-center'>
											<Image src={organization.logoUrl} alt={organization.name} width={64} height={64} className='object-contain w-full h-full'/>
										</div>
									)
								}
							</div>

							<h2 className='text-2xl font-bold'>
								{organization.name}
							</h2>
							{
								organization.email && (
									<>
										<div>
											<Email className='fill-current mx-auto'/>
										</div>
										{organization.email}
									</>
								)
							}

							{
								organization.phone && (
									<>
										<div>
											<Phone className='fill-current mx-auto'/>
										</div>
										{organization.phone}
									</>
								)
							}

							{
								organization.address && (
									<>
										<div>
											<LocationOn className='fill-current mx-auto'/>
										</div>
										{organization.address.street} {organization.address.number}
									</>
								)
							}
							<div className='col-span-2 flex flex-wrap gap-x-24 mt-4 gap-y-8 my-2 w-full justify-evenly'>
								{
									organization.facebook && (
										<SocialLink size={16} image={FacebookLogo} name='Facebook' href={`https://www.facebook.com/${organization.facebook}`} className='brightness-75 hover:brightness-100'/>
									)
								}
								{
									organization.instagram && (
										<SocialLink size={16} image={InstagramLogo} name='Instagram' href={`https://www.instagram.com/${organization.instagram}`} className='brightness-75 hover:brightness-100'/>
									)
								}
								{
									organization.twitter && (
										<SocialLink size={16} image={XLogo} name='Twitter' href={`https://www.twitter.com/${organization.twitter}`} className='brightness-75 hover:brightness-100'/>
									)
								}
								{
									organization.tiktok && (
										<SocialLink size={16} image={TikTokLogo} name='TikTok' href={`https://www.tiktok.com/${organization.tiktok}`} className='brightness-75 hover:brightness-100'/>
									)
								}
								{
									organization.linkedIn && (
										<SocialLink size={16} image={LinkedInLogo} name='LinkedIn' href={`https://www.linkedin.com/${organization.linkedIn}`} className='brightness-75 hover:brightness-100'/>
									)
								}
								{
									organization.youtube && (
										<SocialLink size={16} image={YoutubeLogo} name='YouTube' href={`https://www.youtube.com/${organization.youtube}`} className='brightness-75 hover:brightness-100'/>
									)
								}
							</div>
						</div>
					))
				}
			</div>
		</main>
	);
}
