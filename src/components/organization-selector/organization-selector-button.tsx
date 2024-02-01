'use client';
import React, {useMemo, useRef} from 'react';
import {type AriaMenuProps, useMenuTrigger} from 'react-aria';
import {Item, type MenuTriggerProps, useMenuTriggerState} from 'react-stately';
import {type Organization} from '@prisma/client';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import Add from '@material-design-icons/svg/round/add.svg';
import type OrganizationOption from '@/components/organization-selector/organization-option.ts';
import Button from '@/components/button.tsx';
import OrganizationSelectorMenu from '@/components/organization-selector/organization-selector-menu.tsx';
import Popover from '@/components/popover.tsx';
import {cx} from '@/lib/cva.ts';
import updateActiveOrganization from '@/lib/actions/update-active-organization.ts';

export type OrganizationSelectorButtonProps = {
	readonly className?: string;
	readonly items: Array<Pick<Organization, 'logoUrl' | 'name' | 'id'>>;
	readonly currentOrganization: Pick<Organization, 'logoUrl' | 'name' | 'id'>;
} & Omit<AriaMenuProps<OrganizationOption>, 'items' | 'children'> & MenuTriggerProps;

export default function OrganizationSelectorButton(props: OrganizationSelectorButtonProps) {
	const {currentOrganization, items: organizations} = props;

	const state = useMenuTriggerState(props);

	const ref = useRef<HTMLButtonElement>(null);

	const items = useMemo(() => organizations.map(organization => ({
		organization,
	})), [organizations]);

	const {
		menuTriggerProps,
		menuProps,
	} = useMenuTrigger(
		{
			...props,
		},
		state,
		ref,
	);

	return (
		<>
			<Button
				{...menuTriggerProps}
				ref={ref}
			>
				{currentOrganization.name}
				<ArrowDropDown/>
			</Button>
			{
				state.isOpen && (
					<Popover state={state} triggerRef={ref} placement='bottom end'>
						<OrganizationSelectorMenu
							{...props} {...menuProps} items={[...items, {organization: null}]}
							onAction={async key => {
								const id = Number.parseInt(key as string, 10);
								if (!Number.isNaN(id)) {
									await updateActiveOrganization(id);
									window.location.reload();
								}
							}}
						>
							{
								organization =>
									organization.organization
										? (
											<Item key={organization.organization.id}>
												<div
													className={cx(
														'w-full p-2 text-stone-300 flex justify-between rounded border-b border-stone-700',
														organization.organization.id === currentOrganization.id && 'font-bold',
													)}>
													{organization.organization.name}
												</div>
											</Item>
										)
										: (
											<Item key='new' href='/new-organization'>
												<div className='flex text-stone-300 p-2 justify-between rounded hover:bg-stone-800'>
													Nueva organización
													<Add className='fill-current ml-1'/>
												</div>
											</Item>
										)
							}
						</OrganizationSelectorMenu>
					</Popover>
				)
			}
		</>

	);
}
