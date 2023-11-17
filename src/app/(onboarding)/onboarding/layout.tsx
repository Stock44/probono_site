import React from 'react';
import OnboardingTabLink from '@/app/(onboarding)/onboarding/onboarding-tab-link.tsx';
import TopBarFooterLayout from '@/components/top-bar-footer-layout.tsx';
import AccountButton from '@/app/(onboarding)/onboarding/account-button.tsx';
import {OrganizationDataProgressCard} from '@/app/(my)/my/organization-data-progress-card.tsx';
import {getUserWithOrganizationFromSession} from '@/lib/user.ts';

export default async function OnboardingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUserWithOrganizationFromSession();
	return (
		<TopBarFooterLayout topBarItems={<AccountButton/>}>
			<div className='bg-stone-950 text-stone-200 flex justify-center  place-items-start justify-items-start  mx-auto max-w-2xl mt-16'>
				<nav className='w-48 flex flex-col pt-8 gap-1'/>
				<div className='bg-stone-950 border-stone-700 border rounded p-8 w-full h-fit'>
					<div className='flex mb-4'>
						<OnboardingTabLink className='grow' root='/onboarding'>1. Introducción</OnboardingTabLink>
						<OnboardingTabLink className='grow' root='/onboarding' slug='user'>2. Tus datos</OnboardingTabLink>
						<OnboardingTabLink className='grow' root='/onboarding' slug='organization' isDisabled={user === undefined || user === null}>
							3. Tu organización
						</OnboardingTabLink>
					</div>
					{children}
				</div>
			</div>
		</TopBarFooterLayout>

	);
}
