import React, {type ComponentProps} from 'react';
import {omit} from 'lodash';
import paperVariants, {
	type PaperVariantProps,
} from '@/paper/paper-variants.tsx';

export type PaperProps = ComponentProps<'div'> & PaperVariantProps;

export function Paper(props: PaperProps) {
	return (
		<div
			{...omit(props, ['hoverEffect', 'spacing'])}
			className={paperVariants(props)}
		/>
	);
}
