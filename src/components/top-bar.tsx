'use client';
import React, {type ReactNode, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GeoStatsLogoMark from 'public/logos/geostats-logomark.png';
import {useScrollPosition} from '@n8tb1t/use-scroll-position';
import {motion} from 'framer-motion';
import {cx} from '@/lib/cva.ts';

export type TopBarProps = {
	readonly children: ReactNode;
};

export default function TopBar(props: TopBarProps) {
	const {children} = props;

	const [showBar, setShowBar] = useState(true);

	useScrollPosition(({prevPos, currPos}) => {
		console.log(currPos.y);
		if (currPos.y === 0 && !showBar) {
			setShowBar(true);
		} else if (prevPos.y < currPos.y && !showBar) {
			setShowBar(true);
		} else if (prevPos.y > currPos.y && showBar) {
			setShowBar(false);
		}
	}, [showBar]);

	return (
		<motion.header
			className={cx(
				'fixed z-[1000] backdrop-blur right-0 left-0 w-full h-16 border-b border-stone-800 px-4',
			)}
			animate={{
				top: showBar ? 0 : -64,
			}}
		>
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
		</motion.header>
	);
}

