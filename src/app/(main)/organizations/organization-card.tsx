'use client';
import React, {useEffect, useRef, useState} from 'react';
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
import SocialLink from '@/components/social-link.tsx';

export type OrganizationCardProps = {
	readonly organization: Organization & {address: Address | null};
};

export default function OrganizationCard(props: OrganizationCardProps) {
	const {organization} = props;

	const [position, setPosition] = useState<[number, number]>([0, 0]);

	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			setPosition([event.clientX, event.clientY]);
		};

		window.addEventListener('mousemove', listener);
		return () => {
			window.removeEventListener('mousemove', listener);
		};
	}, []);
	return (
		<div
			ref={container}
			key={organization.id}
			className='relative flex-1 flex flex-col text-stone-300
			border border-stone-800 rounded p-4 gap-x-4 gap-y-4 max-w-96
			 min-w-64 overflow-hidden hover:border-stone-700 transition-colors'>
			<svg
				viewBox='0 0 4 4'
				className='fill-stone-900 absolute w-96 h-96 blur-3xl -z-10' style={{
					top: position[1] - (container.current?.getBoundingClientRect().top ?? 0) - 192,
					left: position[0] - (container.current?.getBoundingClientRect().left ?? 0) - 192,
				}}>
				<circle r={2} cx={2} cy={2}/>
			</svg>
			<div className='flex items-center gap-4 mb-4'>
				<div className='w-16 h-16 border border-stone-800 rounded p-4 flex-none'>
					{
						organization.logoUrl && (
							<div className='overflow-hidden h-full w-full flex items-center justify-center'>
								<Image
									src={organization.logoUrl} alt={organization.name} width={64}
									height={64}
									className='object-contain w-full h-full'/>
							</div>
						)
					}
				</div>
				<h2 className='text-2xl font-bold truncate flex-1'>
					{organization.name}
				</h2>
			</div>
			<div className='grow w-full grid grid-cols-[64px_1fr] gap-x-4 gap-y-4'>
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
			</div>
			<div className='col-span-2 flex flex-wrap gap-x-2 gap-y-8 my-2 w-full justify-evenly'>
				{
					organization.facebook && (
						<SocialLink
							size={16} image={FacebookLogo} name='Facebook'
							href={`https://www.facebook.com/${organization.facebook}`}
							className='brightness-75 hover:brightness-100'/>
					)
				}
				{
					organization.instagram && (
						<SocialLink
							size={16} image={InstagramLogo} name='Instagram'
							href={`https://www.instagram.com/${organization.instagram}`}
							className='brightness-75 hover:brightness-100'/>
					)
				}
				{
					organization.twitter && (
						<SocialLink
							size={16} image={XLogo} name='Twitter'
							href={`https://www.twitter.com/${organization.twitter}`}
							className='brightness-75 hover:brightness-100'/>
					)
				}
				{
					organization.tiktok && (
						<SocialLink
							size={16} image={TikTokLogo} name='TikTok'
							href={`https://www.tiktok.com/${organization.tiktok}`}
							className='brightness-75 hover:brightness-100'/>
					)
				}
				{
					organization.linkedIn && (
						<SocialLink
							size={16} image={LinkedInLogo} name='LinkedIn'
							href={`https://www.linkedin.com/${organization.linkedIn}`}
							className='brightness-75 hover:brightness-100'/>
					)
				}
				{
					organization.youtube && (
						<SocialLink
							size={16} image={YoutubeLogo} name='YouTube'
							href={`https://www.youtube.com/${organization.youtube}`}
							className='brightness-75 hover:brightness-100'/>
					)
				}
			</div>
		</div>
	);
}
