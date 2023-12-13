import React, {type ReactNode} from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import TopBarFooterLayout from '@/components/top-bar-footer-layout.tsx';
import AccountButton from '@/app/(logged-in)/onboarding/account-button.tsx';
import {
	getUserFromSessionWithOrganizations,
} from '@/lib/models/user.ts';
import OrganizationSelect from '@/app/(logged-in)/my/organization-select.tsx';

export type LoggedInLayoutProps = {
	readonly children: ReactNode;
};

// @ts-expect-error withPageAuthRequired typings are too strict
const LoggedInLayout = withPageAuthRequired(async (props: LoggedInLayoutProps) => {
	const {children} = props;

	const user = await getUserFromSessionWithOrganizations();

	return (
		<TopBarFooterLayout topBarItems={
			<>
				{
					user?.organizations && user.organizations.length > 0 && (
						<OrganizationSelect organizations={user.organizations}/>
					)
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
