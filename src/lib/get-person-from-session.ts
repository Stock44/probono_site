import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {type Person} from '@prisma/client';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';

/**
 * Retrieve the logged-in person data using the request's session.
 * @param {string} redirectTo - The path to redirect if there is no currently logged-in user is null.
 * @return {Promise<object>} - The logged-in person if session and person exist.
 */
export default async function getPersonFromSession(redirectTo = '/'): Promise<Person> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return redirect(redirectTo);
	}

	const person = await getPersonByAuthId(session.user.sub as string);

	if (person === null) {
		return redirect(redirectTo);
	}

	return person;
}
