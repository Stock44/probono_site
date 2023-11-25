'use client';
import React, {type ReactNode} from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icon.tsx';

export type MySectionLinkProps = {
	readonly root: string;
	readonly slug?: string;
	readonly children: ReactNode;
	readonly className?: ReactNode;
	readonly iconName: string;
};

export default function MySectionLink(props: MySectionLinkProps) {
	const {root, slug, children, className, iconName} = props;
	const pathname = useSelectedLayoutSegment();
	const selected = (slug === undefined && pathname === null) || pathname === slug;

	return (
		<Link
			href={`${root}/${slug ?? ''}`}
			className={clsx(
				'flex items-center p-2 rounded',
				selected && 'bg-stone-50 text-stone-900 fill-stone-900',
				!selected && 'text-stone-400 hover:bg-stone-800 fill-stone-400',
				className,
			)}
		>
			<Icon name={iconName} className='me-2'/>
			{children}
		</Link>
	);
}
