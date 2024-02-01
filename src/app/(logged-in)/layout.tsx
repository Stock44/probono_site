import React, {type ReactNode} from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {notFound, useSearchParams} from 'next/navigation';
import {cookies} from 'next/headers';
import {Organization} from '@prisma/client';
import invariant from 'ts-tiny-invariant';
import TopBarFooterLayout from '@/components/top-bar-footer-layout.tsx';
import AccountButton from '@/app/(logged-in)/onboarding/account-button.tsx';
import {
	getCurrentUserOrganizations, getUsersActiveOrganization,
} from '@/lib/models/user.ts';
import OrganizationSelectorButton from '@/components/organization-selector/organization-selector-button.tsx';

export type LoggedInLayoutProps = {
	readonly children: ReactNode;
};

// @ts-expect-error withPageAuthRequired typings are too strict
const LoggedInLayout = withPageAuthRequired(async (props: LoggedInLayoutProps) => {
	const {children} = props;

	const organizations = await getCurrentUserOrganizations();

	const organization = await getUsersActiveOrganization();

	return (
		<TopBarFooterLayout topBarItems={
			<>
				{
					organizations && organizations.length > 0
            && <OrganizationSelectorButton items={organizations} currentOrganization={organization!}/>
				}
				<AccountButton/>
			</>
		}>
			{children}
		</TopBarFooterLayout>
	);
}, {
	returnTo: '/my',
});

export default LoggedInLayout;
