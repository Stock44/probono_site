import React, {type ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {getUserFromSession} from '@/lib/models/user.ts';
import OnboardingClientLayout from '@/app/(logged-in)/onboarding/onboarding-client-layout.tsx';
import TopBar from '@/components/top-bar.tsx';
import LinkButton from '@/components/link-button.tsx';
import Footer from '@/components/footer.tsx';

export type OnboardingLayoutProps = {
	readonly children: ReactNode;
};

export default async function OnboardingLayout(props: OnboardingLayoutProps) {
	const {children} = props;
	const user = await getUserFromSession();

	if (user && user._count.organizations > 0) {
		redirect('/my');
	}

	return (
		<div>
			<TopBar>
				<div className='p-4'>
					<LinkButton href='/api/auth/logout' variant='secondary'>Cerrar sesión</LinkButton>
				</div>
			</TopBar>
			<div className='min-h-[calc(100vh-theme(spacing.16))] md:pt-16 mt-16'>
				<OnboardingClientLayout isOrganizationTabDisabled={!user}>
					{children}
				</OnboardingClientLayout>
			</div>
			<Footer/>
		</div>
	);
}
