import React from 'react';
import {redirect} from 'next/navigation';
import AccountForm from '@/app/(logged-in)/my/account/account-form.tsx';
import updateUserAction from '@/lib/actions/update-user-action.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

export default async function AccountPage() {
	const user = await getUserFromSession();
	if (!user) {
		redirect('/onboarding/user');
	}

	return (
		<main>
			<AccountForm action={updateUserAction} user={user}/>
		</main>
	);
}
