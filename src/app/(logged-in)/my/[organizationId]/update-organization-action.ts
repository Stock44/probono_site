'use server';
import {revalidatePath} from 'next/cache';
import {type FormState} from '@/components/form.tsx';
import {type OrganizationUpdate, organizationUpdateSchema} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {updateOrganization} from '@/lib/models/organization.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';

export default async function updateOrganizationAction(organizationId: number, state: FormState<OrganizationUpdate>, data: FormData): Promise <FormState<OrganizationUpdate>> {
	try {
		const parsedData = await decodeForm(data, organizationUpdateSchema);

		await updateOrganization(organizationId, parsedData);
	} catch (error) {
		return handleActionError(state, error);
	}

	revalidatePath(`/my/${organizationId}`);

	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
