'use client';
import React, {type ReactNode} from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export type OnboardingTabLinkProps = {
	readonly root: string;
	readonly slug?: string;
	readonly children: ReactNode;
	readonly className?: ReactNode;
	readonly isDisabled?: boolean;
};

export default function OnboardingTabLink(props: OnboardingTabLinkProps) {
	const {root, slug, children, className, isDisabled} = props;
	const pathname = useSelectedLayoutSegment();
	const selected = (slug === undefined && pathname === null) || pathname === slug;

	return (
		<Link
			href={`${root}/${slug ?? ''}`}
			className={clsx(
				'block border-b text-center p-2',
				selected && 'text-stone-50 border-stone-50',
				isDisabled && 'pointer-events-none text-stone-600',
				!selected && ' border-stone-700',
				!isDisabled && !selected && 'text-stone-400 hover:text-stone-50 ',
				className,
			)}
		>{children}
		</Link>
	);
}
