'use server';
import {ZodError} from 'zod';
import {type FormState} from '@/components/form.tsx';
import {type OrganizationAddress, organizationAddressSchema} from '@/lib/schemas/address.ts';
import {getOrganizationFromSession, getUserFromSessionAction, handleErrorAction} from '@/lib/actions/utils.ts';
import {decodeForm} from '@/lib/schemas/form-utils.ts';

export async function upsertOrganizationAddress(previousState: FormState<OrganizationAddress>, data: FormData): Promise<FormState<OrganizationAddress>> {
	const {values, state} = await getUserFromSessionAction(previousState);

	const organization = getOrganizationFromSession();

	try {
		const organizationAddress = await decodeForm(data, organizationAddressSchema);
	} catch (error) {
		return handleErrorAction(previousState, error);
	}

	const id = Number.parseInt(data.get('id') as string, 10);

	return {
		...previousState,
	};
}
