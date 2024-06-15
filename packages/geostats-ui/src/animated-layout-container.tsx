'use client';

import React, {type ReactNode} from 'react';
import {motion} from 'framer-motion';

export type AnimatedLayoutContainerProps = {
	readonly children: ReactNode;
	readonly className?: string;
};

export function AnimatedLayoutContainer(
	props: AnimatedLayoutContainerProps,
) {
	const {children, className} = props;
	return (
		<motion.div layout className={className}>
			{children}
		</motion.div>
	);
}
