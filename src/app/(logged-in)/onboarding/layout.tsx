import React, {type ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {getUserFromSession} from '@/lib/models/user.ts';
import OnboardingClientLayout from '@/app/(logged-in)/onboarding/onboarding-client-layout.tsx';

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
		<OnboardingClientLayout isOrganizationTabDisabled={!user}>
			{children}
		</OnboardingClientLayout>
	);
}
