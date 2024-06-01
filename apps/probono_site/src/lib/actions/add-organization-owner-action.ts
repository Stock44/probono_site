'use server';

import {revalidatePath} from 'next/cache';
import {render} from '@react-email/render';
import {createElement} from 'react';
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
import OrganizationInvitationEmail from '@/emails/organization-invitation.tsx';
import {
	activeOrganizationInvitationExists,
	createOrganizationInvitation,
} from '@/lib/models/organization-invitation.ts';

import {type FormState} from 'geostats-ui';

export default async function addOrganizationOwnerAction(
	organizationId: number,
	state: FormState<OrganizationOwnerAddition>,
	data: FormData,
): Promise<FormState<OrganizationOwnerAddition>> {
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
		const {email: recipient} = await decodeForm(
			data,
			organizationOwnerAdditionSchema,
		);

		const recipientUser = await prisma.user.findUnique({
			where: {
				email: recipient,
			},
		});

		if (recipientUser) {
			await prisma.organization.update({
				where: {
					id: organizationId,
				},
				data: {
					owners: {
						connect: {
							id: recipientUser.id,
						},
					},
				},
			});
		} else {
			const {email: recipient} = await decodeForm(
				data,
				organizationOwnerAdditionSchema,
			);

			if (
				await activeOrganizationInvitationExists(
					recipient,
					organizationId,
				)
			) {
				return {
					...state,
					success: false,
					fieldErrors: {
						email: [
							'Ya se ha enviado una invitación a este usuario.',
						],
					},
				};
			}

			const invite = await createOrganizationInvitation(
				recipient,
				organizationId,
				user.id,
			);

			const organization = await prisma.organization.findUniqueOrThrow({
				where: {
					id: organizationId,
				},
			});

			const html = render(
				createElement(OrganizationInvitationEmail, {
					organizationLogoUrl: organization.logoUrl ?? '',
					organizationName: organization.name,
					senderEmail: user.email,
					senderName: `${user.givenName} ${user.familyName}`,
					inviteId: invite.id,
				}),
			);

			try {
				await email(recipient, {
					subject: `Invitación a ${organization.name}`,
					html,
				});
			} catch (error) {
				await prisma.organizationInvitation.delete({
					where: {
						id: invite.id,
					},
				});
				throw error;
			}
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
