'use server';
import {revalidatePath} from 'next/cache';
import {getSession} from '@auth0/nextjs-auth0';
import {type FormState} from '@/components/form/form.tsx';
import {type OrganizationUpdate, organizationUpdateSchema} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {updateOrganization} from '@/lib/models/organization.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

export default async function updateOrganizationAction(organizationId: number, state: FormState<OrganizationUpdate>, data: FormData): Promise <FormState<OrganizationUpdate>> {
	const session = await getSession();

	if (!session) {
		return {
			...state,
			success: false,
			formErrors: ['Not authorized'],
		};
	}

	try {
		const parsedData = await decodeForm(data, organizationUpdateSchema);

		await updateOrganization(organizationId, parsedData);
	} catch (error) {
		return handleActionError(state, error);
	}

	revalidatePath('/my');

	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
