'use client';
import Link from 'next/link';
import React, {type ReactNode} from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';
import {cx} from '@/lib/cva.ts';

export type NavLinkProps = {
	readonly slug: string;
	readonly children: ReactNode;
	readonly className?: string;
};

export default function NavLink(props: NavLinkProps) {
	const {slug, children, className} = props;

	const segment = useSelectedLayoutSegment();

	const active = segment === slug || (segment === null && slug === '');

	return (
		<Link
			href={`/${slug}`}
			className={cx(
				'transition-all',
				active && 'text-stone-50',
				!active && 'text-stone-400 hover:text-stone-200',
				className,
			)}
		>
			{children}
		</Link>
	);
}
