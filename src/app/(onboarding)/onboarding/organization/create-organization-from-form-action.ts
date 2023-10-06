'use server';
import {randomUUID} from 'node:crypto';
import {getSession, updateSession} from '@auth0/nextjs-auth0';
import {put} from '@vercel/blob';
import {fileTypeFromBlob} from 'file-type';
import {type ServerActionResult} from '@/lib/server-action-result.ts';
import {decodeForm} from '@/lib/schemas/decode-form.ts';
import {getPersonByAuthId} from '@/lib/get-person-by-auth-id.ts';
import prisma from '@/lib/prisma.ts';
import {organizationSchema} from '@/lib/schemas/organization.ts';
import {management} from '@/lib/auth0.ts';

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default async function createOrganizationFromFormAction(
	data: FormData,
): Promise<ServerActionResult> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return {
			success: false,
			name: 'Not authenticated error',
			message: 'No user session available',
		};
	}

	const person = await getPersonByAuthId(session.user.sub as string);

	if (person === null) {
		return {
			success: false,
			name: 'user data missing',
			message: 'onboarding has not been completed',
		};
	}

	try {
		const organizationData = await decodeForm(
			data,
			organizationSchema.omit({id: true}),
		);

		const logo = data.get('logo') as File;
		const logoFileType = await fileTypeFromBlob(logo);

		let logoUrl: string | undefined;

		if (logoFileType !== undefined) {
			if (!imageTypes.has(logoFileType.mime)) {
				return {
					success: false,
					name: 'wrong file type',
					message: 'file is not a supported image format',
				};
			}

			const result = await put(`organizationLogos/${randomUUID()}`, logo, {
				access: 'public',
				contentType: logoFileType.mime,
			});

			logoUrl = result.url;
		}

		await prisma.organization.create({
			data: {
				...organizationData,
				logoUrl,
				owner: {
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
		}); // Add this to update the session

		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				name: error.name,
				message: error.message,
			};
		}

		throw error;
	}
}
