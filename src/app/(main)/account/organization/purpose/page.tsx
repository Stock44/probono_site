import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import PurposeInfoForm from './purpose-info-form.tsx';

export default withPageAuthRequired(async () => (
	<div>
		<h1>asdf</h1>
		<PurposeInfoForm/>
	</div>
));
