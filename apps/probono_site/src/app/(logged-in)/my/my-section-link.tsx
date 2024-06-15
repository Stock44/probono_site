'use client';
import React, {type ReactNode} from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';
import Link from 'next/link';
import {cx} from '@/lib/cva.ts';

export type MySectionLinkProps = {
	readonly root: string;
	readonly slug?: string;
	readonly children: ReactNode;
	readonly className?: string;
	readonly icon: ReactNode;
};

export default function MySectionLink(props: MySectionLinkProps) {
	const {root, slug, children, className, icon} = props;
	const pathname = useSelectedLayoutSegment();
	const selected =
		(slug === undefined && pathname === null) || pathname === slug;

	return (
		<Link
			href={`${root}/${slug ?? ''}`}
			className={cx(
				'flex items-center p-2 rounded gap-1',
				selected && 'bg-stone-50 text-stone-900 fill-stone-900',
				!selected && 'text-stone-400 hover:bg-stone-800 fill-stone-400',
				className,
			)}
		>
			{icon}
			{children}
		</Link>
	);
}
