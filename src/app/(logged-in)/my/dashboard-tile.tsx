import React, {type ReactNode} from 'react';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import Link from 'next/link';
import {cx} from '@/lib/cva.ts';
<<<<<<< HEAD
import Paper from '@/components/paper/paper.tsx';
=======
>>>>>>> a48affe (Remove redundant SQL insert code)

export type DashboardTileProps = {
	readonly className?: string;
	readonly title: string;
	readonly children: ReactNode;
	readonly href: string;
	readonly icon: ReactNode;
};

export default function DashboardTile(props: DashboardTileProps) {
	const {
		title,
		className,
		children,
		href,
		icon,
	} = props;

	return 	(
<<<<<<< HEAD
		<Paper hoverEffect className={cx('group', className)}>
			<Link href={href} className='w-full h-full'>
				<div className='flex justify-between sticky  mb-2'>
					<h2 className='text-stone-200 font-bold mb-2 flex gap-3'>
						{icon} {title}
					</h2>
					<NavigateNext className='fill-current'/>
				</div>
				<div
					className='overflow-auto max-h-64  scrollbar-thin scrollbar-thumb-stone-50 scrollbar-track-transparent scrollbar-thumb-rounded'>
					{children}
				</div>
			</Link>

		</Paper>
=======
		<Link href={href} className={cx('border p-4 border-stone-800 rounded group hover:bg-white/5 transition-colors', className)}>
			<div className='flex justify-between sticky  mb-2'>
				<h2 className='text-stone-200 font-bold mb-2 flex gap-3'>
					{icon} {title}
				</h2>
				<NavigateNext className='fill-current'/>
			</div>
			<div className='overflow-auto max-h-64  scrollbar-thin scrollbar-thumb-stone-50 scrollbar-track-transparent scrollbar-thumb-rounded'>
				{children}
			</div>
		</Link>
>>>>>>> a48affe (Remove redundant SQL insert code)
	);
}
