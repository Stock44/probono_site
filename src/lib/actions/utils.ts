'use server';
import {type Organization, type User} from '@prisma/client';
import {getSession, type Session} from '@auth0/nextjs-auth0';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {type FormState} from '@/components/form.tsx';
import prisma from '@/lib/prisma.ts';
import {getUserByAuthId} from '@/lib/user.ts';

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

export async function getOrganizationFromSession() {}

export async function getUserOrganizationAction<T>(previousState: FormState<T>, user: User, organizationId: number) {
	const organization = await prisma.organization.findUnique({
		where: {
			id: organizationId,
		},
		include: {
			owners: true,
			activities: true,
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
	if (!organization.owners.some(owner => owner.id === user.id)) {
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

export async function getUserFromSessionAction<T>(previousState: FormState<T>): Promise<{
	values: {
		user: User;
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

	const user = await getUserByAuthId(session.user.sub as string);

	if (user === null) {
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
			user,
			session,
		},
		state: previousState,
	};
}
