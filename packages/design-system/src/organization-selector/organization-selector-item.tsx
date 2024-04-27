import React, {useRef} from 'react';
import {type TreeState, type Node} from 'react-stately';
import {useMenuItem} from 'react-aria';
import type OrganizationOption from '@/components/organization-selector/organization-option.ts';

export type OrganizationSelectorItemProps = {
	readonly item: Node<OrganizationOption>;
	readonly state: TreeState<OrganizationOption>;
};

export default function OrganizationSelectorItem(props: OrganizationSelectorItemProps) {
	const {item, state} = props;
	const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null);

	const ElementType: React.ElementType = item.props.href ? 'a' : 'div';

	const {menuItemProps} = useMenuItem(
		{key: item.key},
		state,
		ref,
	);

	return (
		<ElementType {...menuItemProps} ref={ref} className='w-full hover:bg-stone-800 cursor-pointer outline-none'>
			{item.rendered}
		</ElementType>
	);
}
