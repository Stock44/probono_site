'use client';

import React, {useRef} from 'react';
import {type AriaMenuProps, useMenu} from 'react-aria';
import {useTreeState} from 'react-stately';
import type OrganizationOption from '@/components/organization-selector/organization-option.ts';
import OrganizationSelectorItem from '@/components/organization-selector/organization-selector-item.tsx';

export type OrganizationSelectorMenuProps = AriaMenuProps<OrganizationOption>;

export default function OrganizationSelectorMenu(props: OrganizationSelectorMenuProps) {
	const state = useTreeState(props);

	const ref = useRef<HTMLDivElement>(null);

	const {menuProps} = useMenu(props, state, ref);

	return (
		<div {...menuProps} ref={ref} className='w-full p-2 divide-y divide-stone-700'>
			{[...state.collection].map(item => (
				<OrganizationSelectorItem key={item.key} item={item} state={state}/>
			))}
		</div>
	);
}

