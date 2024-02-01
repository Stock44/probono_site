import {omit} from 'lodash';
import {fileTypeFromBlob} from 'file-type';
import {del, put} from '@vercel/blob';
import {type OrganizationInit, type OrganizationUpdate} from '@/lib/schemas/organization.ts';
import prisma from '@/lib/prisma.ts';
import {connectId} from '@/lib/models/util.ts';

const validImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

/**
 * Create an [organizationId] with the given owner ID and [organizationId] initialization data.
 *
 * @param {number} ownerId - The ID of the owner. Must be a positive integer.
 * @param {OrganizationInit} init - The [organizationId] initialization data. Must be an object.
 * @returns {Promise} A promise that resolves to the created [organizationId] object.
 * @throws {Error} If the logo image is not in a supported image format.
 */
export async function createOrganization(ownerId: number, init: OrganizationInit) {
	if (init.logo) {
		const logoFileType = await fileTypeFromBlob(init.logo);

		if (logoFileType === undefined || !validImageTypes.has(logoFileType.mime)) {
			throw new Error('Logo image is not in a supported image format');
		}

		const result = await put(`organizationLogos/${init.name}.${logoFileType.ext}`, init.logo, {
			access: 'public',
			contentType: logoFileType.mime,
		});

		init.logoUrl = result.url;
	}

	return prisma.$transaction(async tx => {
		const organization = await tx.organization.create({
			data: {
				...omit(init,
					'logo',
					'employeeCountCategoryId',
					'volunteerCountCategoryId',
					'workplaceTypeId',
					'incomeCategoryId',
					'corporationTypeId',
					'categoryId'),
				employeeCountCategory: connectId(init.employeeCountCategoryId),
				volunteerCountCategory: connectId(init.volunteerCountCategoryId),
				incomeCategory: connectId(init.incomeCategoryId),
				corporationType: connectId(init.corporationTypeId),
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
                         from "Address" as a
                                  join "Organization" as o on a.id = o."addressId"
                         where o.id = ${organization.id}`;
		}

		return organization;
	});
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
	return prisma.$transaction(async tx => {
		if (update.logo) {
			const logoFileType = await fileTypeFromBlob(update.logo);

			if (logoFileType === undefined || !validImageTypes.has(logoFileType.mime)) {
				throw new Error('Logo image is not in a supported image format');
			}

			const {logoUrl: currentLogoUrl} = await tx.organization.findFirstOrThrow({
				where: {
					id: organizationId,
				},
				select: {
					logoUrl: true,
				},
			});

			if (currentLogoUrl) {
				await del(currentLogoUrl);
			}

			const result = await put(`organizationLogos/${update.name}.${logoFileType.ext}`, update.logo, {
				access: 'public',
				contentType: logoFileType.mime,
			});

			update.logoUrl = result.url;
		}

		if (update.ageGroups) {
			await tx.organizationToAgeGroup.deleteMany({
				where: {
					organizationId,
				},
			});
		}

		if (update.activities) {
			await tx.organizationToActivity.deleteMany({
				where: {
					organizationId,
				},
			});
		}

		console.log(update.address);

		await tx.organization.update({
			where: {
				id: organizationId,
			},
			data: {
				...omit(update,
					'logo',
					'categoryId',
					'employeeCountCategoryId',
					'volunteerCountCategoryId',
					'incomeCategoryId',
					'corporationTypeId'),
				employeeCountCategory: connectId(update.employeeCountCategoryId),
				volunteerCountCategory: connectId(update.volunteerCountCategoryId),
				incomeCategory: connectId(update.incomeCategoryId),
				corporationType: connectId(update.corporationTypeId),
				category: connectId(update.categoryId),
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
		});

		if (update.address) {
			await tx.$queryRaw`update "Address" 
                         set location=point(${update.address.location[0]}, ${update.address.location[1]})
                         from "Address" as a
                                  join "Organization" as o on a.id = o."addressId"
                         where o.id = ${organizationId}`;
		}
	});
}
