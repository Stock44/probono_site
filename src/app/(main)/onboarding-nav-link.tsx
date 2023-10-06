'use client';
import React from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export default function OnboardingNavLink({
	slug,
	children,
}: {
	readonly slug?: string;
	readonly children: React.ReactNode;
}) {
	const pathname = useSelectedLayoutSegment();
	const selected = (slug === undefined && pathname === null) || pathname === slug;

	return (
		<Link
			href={`/onboarding/${slug ?? ''}`}
			className={clsx(
				selected && 'text-stone-50',
				!selected && 'text-stone-400 hover:text-stone-50',
			)}
		>{children}
		</Link>
	);
}
