import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import SectorsForm from '@/app/(main)/account/organization/sectors/sectors-form.tsx';

export default withPageAuthRequired(async () => <SectorsForm/>);
