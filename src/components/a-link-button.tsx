import React, {type ComponentProps, type ReactNode} from 'react';
import {type VariantProps} from 'cva';
import buttonVariant from '@/components/variants/button.tsx';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ALinkButtonProps = {
	readonly children: ReactNode;
	readonly className?: string;
} & ComponentProps<'a'> & VariantProps<typeof buttonVariant>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function ALinkButton(props: ALinkButtonProps) {
	const {children} = props;
	return (
	// eslint-disable-next-line react/jsx-no-target-blank
		<a rel='noreferrer' {...props} className={buttonVariant(props)}>
			{children}
		</a>
	);
}
