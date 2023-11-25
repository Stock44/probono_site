'use server';
import {redirect} from 'next/navigation';
import {getSession, updateSession} from '@auth0/nextjs-auth0';
import {fileTypeFromBlob} from 'file-type';
import {del, put} from '@vercel/blob';
import {type Organization, type User} from '@prisma/client';
import {omit} from 'lodash';
import {decodeForm} from '@/lib/schemas/form-utils.ts';
import prisma from '@/lib/prisma.ts';
import {type FormState} from '@/components/form.tsx';
import {management} from '@/lib/auth0.ts';
import {organizationSchema, type OrganizationInit} from '@/lib/schemas/organization-init.ts';
import {handleErrorAction} from '@/lib/actions/utils.ts';
import {getUserByAuthId} from '@/lib/user.ts';

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

/**
 * Creates a new organization with the given owner and organization initialization data.
 *
 * @param {User} owner - The owner of the organization.
 * @param {OrganizationInit} organizationInit - The initialization data for the organization.
 * @throws {Error} If the logo image is not in a supported image format.
 * @returns {Promise<void>} A promise that resolves after the organization is created.
 */
async function createOrganization(owner: User, organizationInit: OrganizationInit): Promise<void> {
	if (organizationInit.logo) {
		const logoFileType = await fileTypeFromBlob(organizationInit.logo);

		if (logoFileType === undefined || !imageTypes.has(logoFileType.mime)) {
			throw new Error('Logo image is not in a supported image format');
		}

		const result = await put(`organizationLogos/${organizationInit.name}.${logoFileType.ext}`, organizationInit.logo, {
			access: 'public',
			contentType: logoFileType.mime,
		});

		organizationInit.logoUrl = result.url;
		organizationInit.logo = undefined;
	}

	await prisma.organization.create({
		data: {
			...organizationInit,
			owners: {
				connect: {
					id: owner.id,
				},
			},
			activities: organizationInit.activities ? {
				create: organizationInit.activities.map((item, idx) => ({
					activityId: item.activityId,
					priority: idx,
				})),
			} : undefined,
			organizationBeneficiaries: organizationInit.organizationBeneficiaries ? {
				connect: organizationInit.organizationBeneficiaries.map(id => ({
					id,
				})),
			} : undefined,
		},
	});

	await management.users.update(
		{
			id: owner.authId,
		},
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			app_metadata: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				finished_onboarding: true,
			},
		},
	);

	const session = await getSession();

	if (!session) {
		throw new Error('Unable to update user session, may need to log out and log back in to fix it.');
	}

	await updateSession({
		...session,
		user: {
			...session.user,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			finished_onboarding: true,
		},
	});
}

/**
 * Updates an organization with the provided organization updates.
 *
 * @param {Partial<OrganizationInit>} organizationUpdate - The updated organization details.
 * @param {Organization} currentOrganization - The current organization to be updated.
 *
 * @throws {Error} Throws an error if the logo image is not in a supported format.
 *
 * @returns {Promise<void>} Returns a Promise that resolves when the organization is successfully updated.
 */
async function updateOrganization(organizationUpdate: Partial<OrganizationInit>, currentOrganization: Organization) {
	if (organizationUpdate.logo) {
		const logoFileType = await fileTypeFromBlob(organizationUpdate.logo);

		if (logoFileType === undefined || !imageTypes.has(logoFileType.mime)) {
			throw new Error('Logo image is not in a supported image format');
		}

		if (currentOrganization.logoUrl) {
			await del(currentOrganization.logoUrl);
		}

		const result = await put(`organizationLogos/${organizationUpdate.name}.${logoFileType.ext}`, organizationUpdate.logo, {
			access: 'public',
			contentType: logoFileType.mime,
		});

		organizationUpdate.logoUrl = result.url;
		organizationUpdate.logo = undefined;
	}

	console.log(organizationUpdate);

	await prisma.$transaction(async tx => {
		if (organizationUpdate.ageGroups) {
			await tx.organizationAgeGroup.deleteMany({
				where: {
					organizationId: currentOrganization.id,
				},
			});
		}

		if (organizationUpdate.activities) {
			await tx.organizationToOrganizationActivity.deleteMany({
				where: {
					organizationId: currentOrganization.id,
				},
			});
		}

		await tx.organization.update({
			where: {
				id: currentOrganization.id,
			},
			data: {
				...omit(organizationUpdate, ['ageGroups']),
				organizationAgeGroups: organizationUpdate.ageGroups
					? {
						createMany: {
							data: organizationUpdate.ageGroups.map(item => ({
								ageGroupId: item.ageGroupId,
								gender: item.gender,
							})),
						},
					}
					: undefined,
				activities: organizationUpdate.activities
					? {
						createMany: {
							data: organizationUpdate.activities.map((item, idx) => ({
								activityId: item.activityId,
								priority: idx,
							})),
						},
					}
					: undefined,
				organizationBeneficiaries: organizationUpdate.organizationBeneficiaries ? {
					set: organizationUpdate.organizationBeneficiaries.map(id => ({
						id,
					})),
				} : undefined,
			},
		});
	});
}

/**
 * Upsert an organization via a form server action.
 *
 * @param {FormState<OrganizationInit>} previousState - The previous state of the form.
 * @param {FormData} data - The form data.
 * @returns {Promise<FormState<OrganizationInit>>} - The updated form state after upserting the organization.
 */
export default async function upsertOrganizationAction(
	previousState: FormState<OrganizationInit>,
	data: FormData,
): Promise<FormState<OrganizationInit>> {
	const session = await getSession();

	if (session === null || session === undefined) {
		redirect('/');
	}

	const organization = await prisma.organization.findFirst({
		where: {
			owners: {
				some: {
					authId: session.user.sub as string,
				},
			},
		},
	});

	const {redirectTo} = previousState;

	try {
		if (organization) {
			const organizationUpdate = await decodeForm(data, organizationSchema.partial());

			await updateOrganization(organizationUpdate, organization);
		} else {
			const organizationInit = await decodeForm(data, organizationSchema);

			const owner = await getUserByAuthId(session.user.sub as string);

			if (owner === null) {
				return {
					...previousState,
					formErrors: ['User has not completed registration'],
				};
			}

			await createOrganization(owner, organizationInit);
		}
	} catch (error) {
		return handleErrorAction(previousState, error);
	}

	if (redirectTo) {
		redirect(redirectTo);
	}

	return {
		...previousState,
		formErrors: [],
		fieldErrors: {},
	};
}
