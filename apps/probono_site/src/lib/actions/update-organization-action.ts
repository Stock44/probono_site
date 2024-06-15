'use server';
import {revalidatePath} from 'next/cache';
import {
	type OrganizationUpdate,
	organizationUpdateSchema,
} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {
	updateOrganization,
	userAuthorizedForOrganization,
} from '@/lib/models/organization.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {FormState} from '@/components/form';

export default async function updateOrganizationAction(
	organizationId: number,
	state: FormState<OrganizationUpdate>,
	data: FormData,
): Promise<FormState<OrganizationUpdate>> {
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
		const parsedData = await decodeForm(data, organizationUpdateSchema);

		await updateOrganization(organizationId, parsedData);
	} catch (error) {
		return handleActionError(state, error);
	}

	revalidatePath('/my');
	revalidatePath('/organizations');

	return {
		...state,
		success: true,
		formErrors: [],
		fieldErrors: {},
	};
}
