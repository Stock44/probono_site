'use client';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {useSelectedLayoutSegment} from 'next/navigation';

export default function OrganizationTab({
	slug,
	label,
	className,
}: {
	readonly slug?: string;
	readonly className?: string;
	readonly label: string;
}) {
	const pathname = useSelectedLayoutSegment();
	const selected
    = pathname === slug || (pathname === null && slug === undefined);
	return (
		<Link
			href={`/account/organization/${slug ?? ''}`}
			className={clsx(
				'px-4 py-2 text-center',
				!selected && 'text-stone-400 hover:text-stone-300',
				selected && 'text-stone-50 border-b border-stone-50',
				className,
			)}
		>
			{label}
		</Link>
	);
}
