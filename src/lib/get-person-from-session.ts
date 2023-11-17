import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {type Person} from '@prisma/client';
import {getUserByAuthId} from '@/lib/user.ts';

/**
 * Retrieve the logged-in user data using the request's session.
 * @param {string} redirectTo - The path to redirect if there is no currently logged-in user is null.
 * @return {Promise<object>} - The logged-in user if session and user exist.
 */
export default async function getPersonFromSession(redirectTo = '/'): Promise<Person> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return redirect(redirectTo);
	}

	const person = await getUserByAuthId(session.user.sub as string);

	if (person === null) {
		return redirect(redirectTo);
	}

	return person;
}
