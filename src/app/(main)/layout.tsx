import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/logomark.png';
import UserWidget from '@/components/user-widget';

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen min-w-full mx-auto'>
			<div className=' w-full static h-16 border-b border-stone-800 px-4'>
				<div className='max-w-7xl mx-auto h-full items-center flex gap-2 px-4'>
					<Link href='/' className='text-stone-50 font-semibold items-center'>
						<Image
							src={Logo}
							height={24}
							className='inline me-2'
							alt='geostats logo'
						/>
						<p className='inline'>[GeoStats]</p>
					</Link>
					<div className='grow'/>
					<UserWidget/>
				</div>
			</div>
			<div className='max-w-7xl mx-auto px-4'>{children}</div>
		</div>
	);
}
