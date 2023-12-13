'use client';
import React from 'react';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function ClientProviders({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</UserProvider>
	);
}
