import React, {type ReactNode} from 'react';
import {withPageAuthRequired} from '@auth0/nextjs-auth0';

export type LoggedInLayoutProps = {
	readonly children: ReactNode;
};

// Ensures that for all routes within the (logged-in) group, the user is logged in
// @ts-expect-error withPageAuthRequired typings are too strict
const LoggedInLayout = withPageAuthRequired(async (props: LoggedInLayoutProps) => {
	const {children} = props;

	return children;
}, {
	returnTo: '/my',
});

export default LoggedInLayout;
