import React from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async () => <p>asdf</p>);
