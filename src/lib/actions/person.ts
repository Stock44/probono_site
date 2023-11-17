'use server';
import {getSession} from '@auth0/nextjs-auth0';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {type User} from '@prisma/client';
import {decodeForm} from '@/lib/schemas/form-utils.ts';
import {personSchema} from '@/lib/schemas/person.ts';
import prisma from '@/lib/prisma.ts';
import {type FormState} from '@/components/form.tsx';
import {management} from '@/lib/auth0.ts';

type UserProperties = Omit<User, 'id' | 'authId'>;

/**
 * Either creates or inserts a Person record, based on session id.
 *
 * @param {FormState<UserProperties>} previousState - The previous form state.
 * @param {FormData} data - The form data to update or create the user.
 * @returns {Promise<FormState<UserProperties>>} The updated form state.
 */
export default async function upsertUserAction(
	previousState: FormState<UserProperties>,
	data: FormData,
): Promise<FormState<UserProperties>> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return {
			...previousState,
			formErrors: ['Not authenticated'],
		};
	}

	const authId = session.user.sub as string;

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				authId,
			},
		});

		if (existingUser === null) {
			const personData = await decodeForm(data, personSchema.omit({email: true, password: true}));

			await prisma.user.create({
				data: {
					...personData,
					authId,
				},
			});

			// Await management.users.update(
			// 	{
			// 		id: session.user.sub as string,
			// 	},
			// 	{
			// 		// eslint-disable-next-line @typescript-eslint/naming-convention
			// 		app_metadata: {
			// 			// eslint-disable-next-line @typescript-eslint/naming-convention
			// 			finished_onboarding: true,
			// 		},
			// 	},
			// );
		} else {
			const personData = await decodeForm(data, personSchema.partial());
			await prisma.user.update({
				where: {
					id: existingUser.id,
				},
				data: personData,
			});

			if (personData.email) {
				await management.users.update({
					id: authId,
				}, {
					email: personData.email,
				});
			}

			if (personData.password) {
				await management.users.update({
					id: authId,
				}, {
					password: personData.password,
				});
			}
		}
	} catch (error) {
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
			};
		}

		return {
			...previousState,
			formErrors: ['Unknown form error'],
		};
	}

	if (previousState.redirectTo) {
		redirect(previousState.redirectTo);
	}

	return {
		...previousState,
		formErrors: [],
		fieldErrors: {},
	};
}
