'use client';
import React, {type ReactNode} from 'react';
import {motion} from 'framer-motion';
import {useSelectedLayoutSegment} from 'next/navigation';
import Link from 'next/link';
import {cx} from '@/lib/cva.ts';

export type LayoutContainerProps = {
	readonly children: ReactNode;
	readonly isOrganizationTabDisabled: boolean;
};

const segments = [
	[null, '1. Introducción'],
	['user', '2. Tus datos'],
	['organization', '3. Tu organización'],
] as const;

export default function OnboardingClientLayout(props: LayoutContainerProps) {
	const {children, isOrganizationTabDisabled} = props;

	const selectedSegment = useSelectedLayoutSegment();

	return (
		<div
			className='bg-stone-950 text-stone-200 flex justify-center  place-items-start justify-items-start  mx-auto md:max-w-md'>
			<motion.div layout className='bg-stone-950 border-stone-800 md:border rounded md:p-8 w-full h-fit overflow-hidden'>
				<motion.div layout className='flex mb-4'>
					{
						[segments
							.map(([segment, name]) => {
								const isSelected = segment === selectedSegment;
								return (
									<div key={segment} className='grow'>
										<Link
											href={`/onboarding/${segment ?? ''}`}
											className={cx(
												'p-2 flex justify-center items-center h-16 md:h-auto text-sm md:text-base',
												isSelected && 'text-stone-50',
												!isSelected && 'text-stone-400 hover:text-stone-50 ',
												segment === 'organization' && isOrganizationTabDisabled && 'pointer-events-none text-stone-600',
											)}
										>
											{name}
										</Link>
										{
											isSelected && (
												<motion.div className='w-full border-b border-stone-50' layoutId='selectedBorder'/>
											)
										}
									</div>
								);
							})]
					}
				</motion.div>
				<div className='p-4 md:p-0'>
					{children}
				</div>
			</motion.div>
		</div>
	);
}
