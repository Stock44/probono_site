import React from 'react';
import Logo from 'public/logo.png';
import Image from 'next/image';
import {getSession} from '@auth0/nextjs-auth0';
import OnboardingNavLink from '@/app/(main)/onboarding-nav-link';

export default async function OnboardingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen min-w-full flex flex-col items-center pt-4 gap-32'>
			<Image src={Logo} height={64} alt='GeoStats'/>
			<div className='bg-stone-950 text-stone-200 flex justify-center  place-items-start justify-items-start mx-auto max-w-2xl'>
				<nav className='w-48 flex flex-col pt-8 gap-1'>
					<OnboardingNavLink>Introducción</OnboardingNavLink>
					<OnboardingNavLink slug='person'>Tus datos</OnboardingNavLink>
					<OnboardingNavLink slug='organization'>
						Tu organización
					</OnboardingNavLink>
				</nav>
				<div className='bg-stone-950 border-stone-700 border rounded p-8 w-full h-fit'>
					{children}
				</div>
			</div>
		</div>
	);
}
