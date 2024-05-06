import React, {type ComponentProps, ForwardedRef, forwardRef} from 'react';
import {omit} from 'lodash';
import paperVariants, {
	type PaperVariantProps,
} from '@/paper/paper-variants.tsx';

export type PaperProps = ComponentProps<'div'> & PaperVariantProps;

const Paper = (props: PaperProps, ref: ForwardedRef<HTMLDivElement>) => (
	<div
		{...omit(props, ['hoverEffect', 'spacing'])}
		ref={ref}
		className={paperVariants(props)}
	/>
);

export default forwardRef<HTMLDivElement>(Paper);
