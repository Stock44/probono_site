import {withApiAuthRequired} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {getUserFromSession, getUserFromSessionWithOrganizations} from '@/lib/models/user.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = withApiAuthRequired(async () => {
	const user = await getUserFromSessionWithOrganizations();

	if (!user) {
		redirect('/onboarding');
	}

	if (user._count.organizations === 0) {
		redirect('/onboarding/organization');
	}

	redirect(`/my/${user.organizations[0].id}`);
});
