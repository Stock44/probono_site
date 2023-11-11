'use server';
import {type Organization} from '@prisma/client';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {getSession, updateSession} from '@auth0/nextjs-auth0';
import {fileTypeFromBlob} from 'file-type';
import {del, put} from '@vercel/blob';
import {decodeForm} from '@/lib/schemas/decode-form.ts';
import prisma from '@/lib/prisma.ts';
import {type FormState} from '@/components/form.tsx';
import {management} from '@/lib/auth0.ts';
import {organizationSchema} from '@/lib/schemas/organization.ts';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default async function upsertOrganizationAction(
	previousState: FormState<Organization & {logo: string}>,
	data: FormData,
): Promise<FormState<Organization & {logo: string}>> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return {
			...previousState,
			formErrors: ['Not authenticated'],
		};
	}

	const person = await getPersonByAuthId(session.user.sub as string);

	if (person === null) {
		return {
			...previousState,
			formErrors: ['User has not completed registration'],
		};
	}

	try {
		if (data.has('id')) {
			const organizationData = await decodeForm(data, organizationSchema.partial());

			const id = Number.parseInt(data.get('id')! as string, 10);

			const currentOrganization = await prisma.organization.findUnique({
				where: {
					id,
				},
				include: {
					owners: true,
				},
			});

			if (currentOrganization === null) {
				return {
					...previousState,
					formErrors: ['Specified organization does not exist'],
				};
			}

			// If none of the owners is the current user
			if (!currentOrganization.owners.some(owner => owner.id === person.id)) {
				return {
					...previousState,
					formErrors: ['You are not the owner of the specified organization'],
				};
			}

			const logo = data.get('logo') as File | null;

			if (logo !== null) {
				const logoFileType = await fileTypeFromBlob(logo);

				if (logoFileType === undefined || !imageTypes.has(logoFileType.mime)) {
					return {
						...previousState,
						fieldErrors: {
							logo: ['Logo image is not in a supported image format'],
						},
					};
				}

				if (organizationData.logoUrl) {
					await del(organizationData.logoUrl);
				}

				const result = await put(`organizationLogos/${organizationData.name}.${logoFileType.ext}`, logo, {
					access: 'public',
					contentType: logoFileType.mime,
				});

				organizationData.logoUrl = result.url;
				organizationData.logo = undefined;
			}

			await prisma.organization.update({
				where: {
					id: organizationData.id!,
				},
				data: organizationData,
			});
		} else {
			const logo = data.get('logo') as File | null;

			const organizationData = await decodeForm(data, organizationSchema.omit({id: true}));

			if (logo !== null) {
				const logoFileType = await fileTypeFromBlob(logo);

				if (logoFileType === undefined || !imageTypes.has(logoFileType.mime)) {
					return {
						...previousState,
						fieldErrors: {
							logo: ['Logo image is not in a supported image format'],
						},
					};
				}

				const result = await put(`organizationLogos/${organizationData.name}.${logoFileType.ext}`, logo, {
					access: 'public',
					contentType: logoFileType.mime,
				});

				organizationData.logoUrl = result.url;
				organizationData.logo = undefined;
			}

			await prisma.organization.create({
				data: {
					...organizationData,
					owners: {
						connect: {
							id: person.id,
						},
					},
				},
			});

			await management.users.update(
				{
					id: session.user.sub as string,
				},
				{
					// eslint-disable-next-line @typescript-eslint/naming-convention
					app_metadata: {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						finished_onboarding: true,
					},
				},
			);

			await updateSession({
				...session,
				user: {
					...session.user,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					finished_onboarding: true,
				},
			});
		}
	} catch (error) {
		console.log(error);
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

	if (previousState.redirectTo) {
		redirect(previousState.redirectTo);
	}

	return {
		...previousState,
		formErrors: [],
		fieldErrors: {},
	};
}
