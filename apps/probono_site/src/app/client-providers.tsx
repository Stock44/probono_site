'use client';
import React from 'react';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RouterProvider} from '@react-aria/utils';
import {useRouter} from 'next/navigation';

const queryClient = new QueryClient();

export default function ClientProviders({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	const router = useRouter();
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider navigate={router.push}>
					{children}
				</RouterProvider>
			</QueryClientProvider>
		</UserProvider>
	);
}
