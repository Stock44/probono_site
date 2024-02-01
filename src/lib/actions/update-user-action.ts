'use server';
import {getSession} from '@auth0/nextjs-auth0';
import {revalidatePath} from 'next/cache';
import type {FormState} from '@/components/form/form.tsx';
import {type UserUpdate, userUpdateSchema} from '@/lib/schemas/user.ts';
import prisma from '@/lib/prisma.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {updateUser} from '@/lib/models/user.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

export default async function updateUserAction(state: FormState< UserUpdate>, data: FormData): Promise<FormState<UserUpdate>> {
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
			return {
				...state,
				success: false,
				formErrors: ['No existing user found.'],
			};
		}
	} catch (error) {
		return handleActionError(state, error);
	}

	revalidatePath('/my/account');
	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
