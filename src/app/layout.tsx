import React from 'react';
import {type Metadata} from 'next';
import './globals.css';
import ClientProviders from '@/app/client-providers.tsx';

export const metadata: Metadata = {
	title: 'probono',
	description: 'probono',
};

export default function RootLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='bg-stone-950'>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	);
}
