import React, {type ReactNode} from 'react';
import {type Metadata} from 'next';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
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
			<Head>
				<script type='text/javascript'>
					{`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jh8ea3tii2");
        `}
				</script>
			</Head>
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
