import React, {type ReactNode} from 'react';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import Link from 'next/link';
import {cx} from '@/lib/cva.ts';

import {Paper} from 'geostats-ui';

export type DashboardTileProps = {
	readonly className?: string;
	readonly title: string;
	readonly children: ReactNode;
	readonly href: string;
	readonly icon: ReactNode;
};

export default function DashboardTile(props: DashboardTileProps) {
	const {title, className, children, href, icon} = props;

	return (
		<Paper hoverEffect className={cx('group', className)}>
			<Link href={href} className='size-full'>
				<div className='sticky mb-2 flex  justify-between'>
					<h2 className='mb-2 flex gap-3 font-bold text-stone-200'>
						{icon} {title}
					</h2>
					<NavigateNext className='fill-current' />
				</div>
				<div className='max-h-64 overflow-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbar-thumb-rounded'>
					{children}
				</div>
			</Link>
		</Paper>
	);
}
