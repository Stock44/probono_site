import React from 'react';
import {redirect} from 'next/navigation';
import OrganizationForm from '@/app/(logged-in)/onboarding/organization/organization-form.tsx';
import {type OrganizationInit, organizationInitSchema} from '@/lib/schemas/organization.ts';
import {type FormState} from '@/components/form.tsx';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {decodeForm} from '@/lib/form-utils.ts';
import {createOrganization} from '@/lib/models/organization.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import AnimatedLayoutContainer from '@/components/animated-layout-container.tsx';

export default async function OrganizationOnboardingPage() {
	const user = await getUserFromSession();

	if (!user) {
		redirect('/onboarding/user');
	}

	const action = async (state: FormState<OrganizationInit>, data: FormData) => {
		'use server';
		try {
			const parsedData = await decodeForm(data, organizationInitSchema);
			await createOrganization(user.id, parsedData);
		} catch (error) {
			return handleActionError(state, error);
		}

		redirect('/my');
	};

	return (
		<AnimatedLayoutContainer>
			<h1 className='text-2xl text-stone-50'>Datos de tu organización</h1>
			<p className='text-stone-300 mb-2'>
				También necesitamos algunos datos sobre tu organización.
			</p>
			<OrganizationForm action={action}/>
		</AnimatedLayoutContainer>
	);
}
