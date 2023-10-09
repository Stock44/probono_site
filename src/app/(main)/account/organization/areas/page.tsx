import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import AreasForm from '@/app/(main)/account/organization/areas/areas-form.tsx';

export default withPageAuthRequired(async () => <AreasForm/>);
