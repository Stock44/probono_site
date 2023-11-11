'use server';
import {type Organization, type Person} from '@prisma/client';
import {getSession, type Session} from '@auth0/nextjs-auth0';
import {ZodError} from 'zod';
import {type FormState} from '@/components/form.tsx';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';
import prisma from '@/lib/prisma.ts';

export async function handleErrorAction<T>(previousState: FormState<T>, error: unknown): Promise<FormState<T>> {
	if (error instanceof ZodError) {
		return {
			...previousState,
			...error.formErrors,
		};
	}

	if (error instanceof Error) {
		return {
			...previousState,
			formErrors: [error.message],
			fieldErrors: {},
		};
	}

	return {
		...previousState,
		formErrors: ['Unknown form error'],
		fieldErrors: {},
	};
}

export async function getPersonOrganizationAction<T>(previousState: FormState<T>, person: Person, organizationId: number): Promise<{
	organization: Organization | null;
	state: FormState<T>;
}> {
	const organization = await prisma.organization.findUnique({
		where: {
			id: organizationId,
		},
		include: {
			owners: true,
		},
	});

	if (organization === null) {
		return {
			organization: null,
			state: {
				...previousState,
				formErrors: ['Specified organization does not exist'],
			},
		};
	}

	// If none of the owners is the current user
	if (!organization.owners.some(owner => owner.id === person.id)) {
		return {
			organization: null,
			state: {
				...previousState,
				formErrors: ['You are not the owner of the specified organization'],
			},
		};
	}

	return {
		organization,
		state: previousState,
	};
}

export async function getPersonFromSessionAction<T>(previousState: FormState<T>): Promise<{
	values: {
		person: Person;
		session: Session;
	} | null;
	state: FormState<T>;
}> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return {
			values: null,
			state: {
				...previousState,
				formErrors: ['Not authenticated'],
			},
		};
	}

	const person = await getPersonByAuthId(session.user.sub as string);

	if (person === null) {
		return {
			values: null,
			state: {
				...previousState,
				formErrors: ['User has not completed registration'],
			},
		};
	}

	return {
		values: {
			person,
			session,
		},
		state: previousState,
	};
}
