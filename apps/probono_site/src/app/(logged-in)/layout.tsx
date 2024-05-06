import {type ReactNode} from 'react';
import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';

export type LoggedInLayoutProps = {
	readonly children: ReactNode;
};

// Ensures that for all routes within the (logged-in) group, the user is logged in
export default async function LoggedInLayout(props: LoggedInLayoutProps) {
	const {children} = props;

	const session = await getSession();

	if (!session) {
		redirect('/');
	}

	// Solves type compilation issue
	return children as JSX.Element;
}
