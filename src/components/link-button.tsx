import React, {type ReactNode} from 'react';
import Link, {type LinkProps} from 'next/link';
import {type VariantProps} from 'cva';
import buttonVariant from '@/components/variants/button.tsx';

export type LinkButtonProps = {
	readonly children: ReactNode;
	readonly className?: string;
} & LinkProps & VariantProps<typeof buttonVariant>;

export default function LinkButton(props: LinkButtonProps) {
	const {children} = props;
	return (
		<Link {...props} className={buttonVariant(props)}>
			{children}
		</Link>
	);
}
