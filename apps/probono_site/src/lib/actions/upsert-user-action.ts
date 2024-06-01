'use server';
import {getSession} from '@auth0/nextjs-auth0';
import {
	type UserInit,
	userInitSchema,
	type UserUpdate,
	userUpdateSchema,
} from '@/lib/schemas/user.ts';
import prisma from '@/lib/prisma.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {createUser, updateUser} from '@/lib/models/user.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

import {type FormState} from 'geostats-ui';

export default async function upsertUserAction(
	state: FormState<UserInit | UserUpdate>,
	data: FormData,
): Promise<FormState<UserInit | UserUpdate>> {
	const session = await getSession();
	if (!session) {
		return {
			...state,
			success: false,
			formErrors: ['Not authenticated,'],
		};
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				authId: session.user.sub as string,
			},
			include: {
				_count: {
					select: {
						organizations: true,
					},
				},
			},
		});

		if (user) {
			const parsedData = await decodeForm(data, userUpdateSchema);
			await updateUser(user.id, parsedData);
		} else {
			const parsedData = await decodeForm(data, userInitSchema);
			await createUser(session.user.sub as string, parsedData);
		}
	} catch (error) {
		return handleActionError(state, error);
	}

	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
