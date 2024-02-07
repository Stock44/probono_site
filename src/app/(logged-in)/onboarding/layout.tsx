import React, {type ReactNode} from 'react';
import {redirect} from 'next/navigation';
import Menu from '@material-design-icons/svg/round/menu.svg';
import {getUserFromSession} from '@/lib/models/user.ts';
import OnboardingClientLayout from '@/app/(logged-in)/onboarding/onboarding-client-layout.tsx';
import TopBar from '@/components/top-bar.tsx';
import SidebarTrigger from '@/components/sidebar-trigger.tsx';
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
				<SidebarTrigger icon={<Menu className='fill-current'/>} variant='text'>
					<div className='p-4'>
						<LinkButton href='/api/auth/logout'>Cerrar sesión</LinkButton>
					</div>
				</SidebarTrigger>
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
