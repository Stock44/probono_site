import {omit} from 'lodash';
import {del, put} from '@vercel/blob';
import {filetypeextension} from 'magic-bytes.js';
import {type Organization, type Prisma, type User} from '@prisma/client';
import {type OrganizationInit, type OrganizationUpdate} from '@/lib/schemas/organization.ts';
import prisma from '@/lib/prisma.ts';

export async function getApprovedOrganizationLocations() {
	const result = (
		await prisma.$queryRaw`
        select o.id                                 as id,
               array [a.location[0], a.location[1]] as location
        from "Organization" as o
                 join "Address" as a on o."addressId" = a.id
        where o.approved = true;
    `
	);

	return result as Array<{
		id: number;
		location?: [number, number];
	}>;
}

export async function getApprovedOrganizationInfo() {
	const locations = await getApprovedOrganizationLocations();
	const organizations = await prisma.organization.findMany({
		where: {
			approved: true,
		},
		include: {
			address: true,
		},
		orderBy: {
			name: 'desc',
		},
	});
	console.log(locations);

	const addressMap = new Map(locations.map(location => [location.id, location.location] as const));
	console.log(addressMap);

	return organizations.map(organization => ({
		...organization,
		location: addressMap.get(organization.id),
	}));
}

export async function getApprovedOrganizationLocations() {
	const result = (
		await prisma.$queryRaw`
        select o.id                                 as id,
               array [a.location[0], a.location[1]] as location
        from "Organization" as o
                 join "Address" as a on o."addressId" = a.id
        where o.approved = true;
    `
	);

	return result as Array<{
		id: number;
		location?: [number, number];
	}>;
}

export async function getApprovedOrganizationInfo() {
	const locations = await getApprovedOrganizationLocations();
	const organizations = await prisma.organization.findMany({
		where: {
			approved: true,
		},
		include: {
			address: true,
		},
		orderBy: {
			name: 'desc',
		},
	});

	const addressMap = new Map(locations.map(location => [location.id, location.location] as const));

	return organizations.map(organization => ({
		...organization,
		location: addressMap.get(organization.id),
	}));
}

/**
 * Checks whether a user is authorized for a given organization.
 *
 * @param {number} organizationId - The ID of the organization to check authorization for.
 * @param {number} userId - The ID of the user to check authorization for.
 * @returns {boolean} - True if the user is authorized for the organization, otherwise false.
 */
export async function userAuthorizedForOrganization(userId: number, organizationId: number) {
	const authorized = await prisma.organization.findFirst({
		where: {
			id: organizationId,
			owners: {
				some: {
					id: userId,
				},
			},
		},
		select: {
			id: true,
		},
	});

	return Boolean(authorized);
}

/**
 * Creates a new organization with the specified owner and initialization data.
 *
 * @param {number} ownerId - The ID of the owner for the organization.
 * @param {OrganizationInit} init - The initialization data for the organization.
 * @returns {Promise<Organization>} - A promise that resolves to the created organization.
 * @throws {Error} - If the file extension for the logo is not found.
 */
export async function createOrganization(ownerId: number, init: OrganizationInit): Promise<Organization> {
	const organization = await prisma.$transaction(async tx => {
		const organization = await tx.organization.create({
			// @ts-expect-error type mismatched when using ids directly and at the same time using create to connect records
			data: {
				...omit(init,
					['logo']),
				address: init.address
					? {
						create: init.address,
					}
					: undefined,
				owners: {
					connect: {
						id: ownerId,
					},
				},
				ageGroups: init.ageGroups ? {
					create: init.ageGroups.map(ageGroup => ({
						ageGroupId: ageGroup.ageGroupId,
						gender: ageGroup.gender,
					})),
				} : undefined,
				activities: init.activities ? {
					create: init.activities.map((item, idx) => ({
						activityId: item.activityId,
						priority: idx,
					})),
				} : undefined,
				beneficiaries: init.beneficiaries ? {
					connect: init.beneficiaries.map(id => ({
						id,
					})),
				} : undefined,
			},
		});

		if (init.address) {
			await tx.$queryRaw`update "Address"
                         set location=point(${init.address.location[0]}, ${init.address.location[1]})
                         from "Organization" as o
                         where (o."addressId" = ${organization.addressId} and o.id = ${organization.id})`;
		}

		return organization;
	});

	if (init.logo) {
		const fileStart = new Uint8Array(await init.logo.slice(0, 100).arrayBuffer());

		const extensions = filetypeextension(fileStart);

		if (extensions.length === 0) {
			throw new Error('Can\'t find correct extension for file.');
		}

		const result = await put(`organizationLogos/${organization.id}-${Date.now().valueOf()}.${extensions[0]}`, init.logo, {
			access: 'public',
		});

		return prisma.organization.update({
			where: {
				id: organization.id,
			},
			data: {
				logoUrl: result.url,
			},
		});
	}

	return organization;
}

/**
 * Updates an [organizationId] with the provided ID and update object.
 *
 * @param {number} organizationId - The ID of the [organizationId] to update.
 * @param {Partial<OrganizationInit>} update - The partial [organizationId] object containing the fields to update.
 * @return {Promise<void>} - A promise that resolves when the [organizationId] is successfully updated.
 * @throws {Error} - Throws an error if the logo image is not in a supported format.
 */
export async function updateOrganization(organizationId: number, update: OrganizationUpdate) {
	const organization = await prisma.organization.findUniqueOrThrow({
		where: {
			id: organizationId,
		},
	});

	const operations: Array<Prisma.PrismaPromise<any>> = [];

	if (update.ageGroups) {
		operations.push(prisma.organizationToAgeGroup.deleteMany({
			where: {
				organizationId,
			},
		}));
	}

	if (update.activities) {
		operations.push(prisma.organizationToActivity.deleteMany({
			where: {
				organizationId,
			},
		}));
	}

	operations.push(prisma.organization.update({
		where: {
			id: organizationId,
		},
		// @ts-expect-error type mismatched when using ids directly and at the same time using create to connect records
		data: {
			...omit(update,
				['logo'],
			),
			address: update.address
				? {
					upsert: {
						update: omit(update.address, 'location'),
						create: omit(update.address, 'location'),
					},
				}
				: undefined,
			ageGroups: update.ageGroups
				? {
					createMany: {
						data: update.ageGroups.map(item => ({
							ageGroupId: item.ageGroupId,
							gender: item.gender,
						})),
					},
				}
				: undefined,
			activities: update.activities
				? {
					createMany: {
						data: update.activities.map((item, idx) => ({
							activityId: item.activityId,
							priority: idx,
						})),
					},
				}
				: undefined,
			beneficiaries: update.beneficiaries ? {
				set: update.beneficiaries.map(id => ({
					id,
				})),
			} : undefined,
		},
	}));

if (organization.addressId && update.address) {
	if (update.address) {
		console.log(`updating organization ${organization.id}`);
		operations.push(prisma.$queryRaw`update "Address" as a
                                     set location=point(${update.address.location[0]}, ${update.address.location[1]})
                                     from "Organization" as o
                                     where (o."addressId" = a.id and o.id = ${organization.id})`);
	}

	await prisma.$transaction(operations);

	if (update.logo) {
		const fileStart = new Uint8Array(await update.logo.slice(0, 100).arrayBuffer());

		const extensions = filetypeextension(fileStart);

		if (extensions.length === 0) {
			throw new Error('Can\'t find correct extension for file.');
		}

		if (organization.logoUrl) {
			await del(organization.logoUrl);
		}

		const result = await put(`organizationLogos/${organizationId}-${Date.now().valueOf()}.${extensions[0]}`, update.logo, {
			access: 'public',
		});

		await prisma.organization.update({
			where: {
				id: organizationId,
			},
			data: {
				logoUrl: result.url,
			},
		});
	}
}

/**
 * Deletes organizations and related records.
 *
 * @param {number[]} ids - An array of organization IDs to delete.
 * @return {Promise<void>} - A Promise that resolves when the organizations and related records have been deleted.
 */
export async function deleteOrganizations(ids: number[]): Promise<void> {
	// Get organizations that have a logo
	const organizations = await prisma.organization.findMany({
		where: {
			id: {
				in: ids,
			},
			logoUrl: {
				not: null,
			},
		},
		select: {
			logoUrl: true,
		},
	});

	// Store logo url into an array to delete
	const logosToDelete = organizations.map(({logoUrl}) => logoUrl!);

	// Delete organizations and related records
	await prisma.$transaction([
		prisma.organizationInvitation.deleteMany({
			where: {
				organizationId: {
					in: ids,
				},
			},
		}),
		prisma.organizationToActivity.deleteMany({
			where: {
				organizationId: {
					in: ids,
				},
			},
		}),
		prisma.organizationToAgeGroup.deleteMany({
			where: {
				organizationId: {
					in: ids,
				},
			},
		}),
		prisma.organization.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		}),
	]);

	// Delete logos after organizations have been deleted.
	await del(logosToDelete);
}

/**
 * Retrieves organizations that have a sole owner with the provided user ID.
 *
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Organization[]>} - A Promise that resolves to an array of objects representing the organizations with the provided user as their sole owner.
 *
 * @example
 * const organizations = await getOrganizationsWithSoleOwner(123);
 * console.log(organizations);
 * // Output: [{ id: 1, _count: { owners: 1 } }, { id: 2, _count: { owners: 1 } }]
 */
export async function getUsersDependantOrganizations(userId: number): Promise<Array<Organization & {
	_count: {owners: number};
}>> {
	const organizations = await prisma.organization.findMany({
		where: {
			owners: {
				some: {
					id: userId,
				},
			},
		},
		include: {
			_count: {
				select: {
					owners: true,
				},
			},
		},
	});

	return organizations.filter(organization => organization._count.owners === 1);
}

export async function getOrganizationOwners(organizationId: number): Promise<User[]> {
	return prisma.organization.findUniqueOrThrow({
		where: {
			id: organizationId,
		},
		select: {
			owners: true,
		},
	}).owners();
}
