import React from 'react';
import {type Metadata} from 'next';
import 'leaflet/dist/leaflet.css';
import localFont from 'next/font/local';
import './globals.css';
import ClientProviders from '@/app/client-providers.tsx';

const myFont = localFont({src: '../../node_modules/material-symbols/material-symbols-rounded.woff2', variable: '--font-material-symbols-rounded'});

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
		<html lang='en' className={`${myFont.variable}`}>
			<body className='bg-stone-950'>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	);
}
