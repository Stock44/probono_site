'use server';

import {revalidatePath} from 'next/cache';
import {type FormState} from '@/components/form/form.tsx';
import {
	type OrganizationOwnerAddition,
	organizationOwnerAdditionSchema,
} from '@/lib/schemas/organization-owner-addition.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import prisma from '@/lib/prisma.ts';
import {userAuthorizedForOrganization} from '@/lib/models/organization.ts';
import email from '@/lib/email.ts';

export default async function addOrganizationOwnerAction(organizationId: number, state: FormState<OrganizationOwnerAddition>, data: FormData): Promise<FormState<OrganizationOwnerAddition>> {
	const user = await getUserFromSession();

	if (!user) {
		return {
			...state,
			success: false,
			formErrors: ['Not authenticated'],
		};
	}

	if (!(await userAuthorizedForOrganization(user.id, organizationId))) {
		return {
			...state,
			success: false,
			formErrors: ['Not authorized to modify organization'],
		};
	}

	try {
		const {email: recipient} = await decodeForm(data, organizationOwnerAdditionSchema);

		const user = await prisma.user.findUnique({
			where: {
				email: recipient,
			},
		});

		if (user) {
			await prisma.organization.update({
				where: {
					id: organizationId,
				},
				data: {
					owners: {
						connect: {
							id: user.id,
						},
					},
				},
			});
		} else {
			await email(recipient, {
				subject: 'Hello ✔',
				html: '<b>Hello world?</b>',
			});
		}
	} catch (error) {
		return handleActionError(state, error);
	}

	revalidatePath('/my/members');

	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
