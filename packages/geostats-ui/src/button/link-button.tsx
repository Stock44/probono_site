import React, {type ReactNode} from 'react';
import Link, {type LinkProps} from 'next/link';
import {type VariantProps} from 'cva';
import {buttonVariants} from '@/button/button-variants.tsx';

export type LinkButtonProps = {
	readonly children: ReactNode;
	readonly className?: string;
} & LinkProps &
	VariantProps<typeof buttonVariants>;

export function LinkButton(props: LinkButtonProps) {
	const {children} = props;
	return (
		<Link {...props} className={buttonVariants(props)}>
			{children}
		</Link>
	);
}
