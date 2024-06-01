'use server';
import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {
	type OrganizationInit,
	organizationInitSchema,
} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {createOrganization} from '@/lib/models/organization.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

import {type FormState} from 'geostats-ui';

export default async function createOrganizationAction(
	userId: number,
	state: FormState<OrganizationInit>,
	data: FormData,
): Promise<FormState<OrganizationInit>> {
	const session = await getSession();

	if (!session) {
		return {
			...state,
			success: false,
			formErrors: ['Not authenticated.'],
		};
	}

	try {
		const parsedData = await decodeForm(data, organizationInitSchema);
		const organization = await createOrganization(userId, parsedData);
		cookies().set('organizationId', organization.id.toString());
	} catch (error) {
		return handleActionError(state, error);
	}

	redirect('/my/general');
}
