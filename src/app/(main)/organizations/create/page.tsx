import React from 'react';
import GeneralDataForm from '@/app/organization/create/OrganizationForm';
import {getPersonByAuthId} from '@/lib/serverFunctions/getPersonByAuthId';
import {getUser} from '@/lib/auth0';

export default async function CreateOrganizationPage() {
	const user = await getUser();
	const userData = await getPersonByAuthId(user.sub);
	return (
		<div className='w-full flex justify-center dark:text-stone-200 p-4'>
			<GeneralDataForm person={userData}/>
		</div>
	);
}
