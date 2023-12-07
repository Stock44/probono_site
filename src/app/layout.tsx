import React, {type ReactNode} from 'react';
import {type Metadata} from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import ClientProviders from '@/app/client-providers.tsx';
import {ToastProvider} from '@/components/toast.tsx';

export const metadata: Metadata = {
	title: 'probono',
	description: 'probono',
};

export type RootLayoutProps = {
	readonly children: ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
	const {children} = props;
	return (
		<html lang='en'>
			<body className='bg-stone-950'>
				<ClientProviders>
					<ToastProvider>
						{children}
					</ToastProvider>
				</ClientProviders>
			</body>
		</html>
	);
}
