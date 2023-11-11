'use server';
import {getSession} from '@auth0/nextjs-auth0';
import {type Person} from '@prisma/client';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {decodeForm} from '@/lib/schemas/form-utils.ts';
import {personSchema} from '@/lib/schemas/person.ts';
import prisma from '@/lib/prisma.ts';
import {type FormState} from '@/components/form.tsx';
import {management} from '@/lib/auth0.ts';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';

type PersonProperties = Omit<Person, 'id' | 'authId'>;

/**
 * Either creates or inserts a Person record, based on session id.
 *
 * @param {FormState<PersonProperties>} previousState - The previous form state.
 * @param {FormData} data - The form data to update or create the person.
 * @returns {Promise<FormState<PersonProperties>>} The updated form state.
 */
export default async function upsertPersonAction(
	previousState: FormState<PersonProperties>,
	data: FormData,
): Promise<FormState<PersonProperties>> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return {
			...previousState,
			formErrors: ['Not authenticated'],
		};
	}

	const authId = session.user.sub as string;

	try {
		const existingPerson = await prisma.person.findUnique({
			where: {
				authId,
			},
		});

		if (existingPerson === null) {
			const personData = await decodeForm(data, personSchema.omit({email: true, password: true}));

			await prisma.person.create({
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
			await prisma.person.update({
				where: {
					id: existingPerson.id,
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
