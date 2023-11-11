'use server';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {updateSession} from '@auth0/nextjs-auth0';
import {fileTypeFromBlob} from 'file-type';
import {del, put} from '@vercel/blob';
import {type Organization} from '@prisma/client';
import {decodeForm} from '@/lib/schemas/form-utils.ts';
import prisma from '@/lib/prisma.ts';
import {type FormState} from '@/components/form.tsx';
import {management} from '@/lib/auth0.ts';
import {organizationSchema} from '@/lib/schemas/organization.ts';
import {getPersonFromSessionAction, getPersonOrganizationAction, handleErrorAction} from '@/lib/actions/utils.ts';

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default async function upsertOrganizationAction(
	previousState: FormState<Organization & {logo: File}>,
	data: FormData,
): Promise<FormState<Organization & {logo: File}>> {
	const {values, state} = await getPersonFromSessionAction(previousState);

	if (values === null) {
		return state;
	}

	try {
		if (data.has('id')) {
			const organizationData = await decodeForm(data, organizationSchema.partial());

			const id = Number.parseInt(data.get('id')! as string, 10);

			const {organization: currentOrganization, state} = await getPersonOrganizationAction(previousState, values.person, id);

			if (currentOrganization === null) {
				return state;
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
							id: values.person.id,
						},
					},
				},
			});

			await management.users.update(
				{
					id: values.person.authId,
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
				...values.session,
				user: {
					...values.session.user,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					finished_onboarding: true,
				},
			});
		}
	} catch (error) {
		return handleErrorAction(previousState, error);
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
