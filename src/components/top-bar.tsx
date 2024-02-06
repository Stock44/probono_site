import React, {type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GeoStatsLogoMark from 'public/logos/geostats-logomark.png';

export type TopBarProps = {
	readonly children: ReactNode;
};

export default function TopBar(props: TopBarProps) {
	const {children} = props;

	return (
		<header className='w-full h-16 border-b border-stone-800 px-4'>
			<div className='max-w-7xl mx-auto h-full justify-between items-center flex gap-2'>
				<Link href='/' className='flex items-center gap-2 text-md font-bold text-stone-50'>
					<Image
						src={GeoStatsLogoMark}
						height={28}
						className='mx-auto my-4'
						alt='geostats logo'
					/>
					[GeoStats]
				</Link>
				<div className='grow'/>
				{children}
			</div>
		</header>
	);
}

