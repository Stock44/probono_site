import React from 'react';
import {
	Root,
	Content,
	type CollapsibleProps,
} from '@radix-ui/react-collapsible';

export default function Collapsible({children, ...props}: CollapsibleProps) {
	return (
		<Root {...props}>
			<Content>{children}</Content>
		</Root>
	);
}
