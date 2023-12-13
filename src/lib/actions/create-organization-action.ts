import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import type {FormState} from '@/components/form.tsx';
import {type OrganizationInit, organizationInitSchema} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {createOrganization} from '@/lib/models/organization.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

export default async function createOrganizationAction(userId: number, state: FormState<OrganizationInit>, data: FormData): Promise<FormState<OrganizationInit>> {
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
		await createOrganization(userId, parsedData);
	} catch (error) {
		return handleActionError(state, error);
	}

	redirect('/my');
}
