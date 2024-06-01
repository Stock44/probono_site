'use client';
import React, {useMemo, useRef} from 'react';
import {type AriaMenuProps, useMenuTrigger} from 'react-aria';
import {Item, type MenuTriggerProps, useMenuTriggerState} from 'react-stately';
import {type Organization} from '@prisma/client';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import Add from '@material-design-icons/svg/round/add.svg';
import type OrganizationOption from '@/components/organization-selector/organization-option.ts';
import OrganizationSelectorMenu from '@/components/organization-selector/organization-selector-menu.tsx';
import updateActiveOrganization from '@/lib/actions/update-active-organization.ts';
import {Button, Popover, cx} from 'geostats-ui';

export type OrganizationSelectorButtonProps = {
	readonly className?: string;
	readonly items: Array<Pick<Organization, 'logoUrl' | 'name' | 'id'>>;
	readonly currentOrganization: Pick<Organization, 'logoUrl' | 'name' | 'id'>;
} & Omit<AriaMenuProps<OrganizationOption>, 'items' | 'children'> &
	MenuTriggerProps;

export default function OrganizationSelectorButton(
	props: OrganizationSelectorButtonProps,
) {
	const {currentOrganization, items: organizations, className} = props;

	const state = useMenuTriggerState(props);

	const ref = useRef<HTMLButtonElement>(null);

	const items = useMemo(
		() =>
			organizations.map(organization => ({
				organization,
			})),
		[organizations],
	);

	const {menuTriggerProps, menuProps} = useMenuTrigger(
		{
			...props,
		},
		state,
		ref,
	);

	return (
		<>
			<Button {...menuTriggerProps} ref={ref} className={className}>
				<span className='flex-1 truncate'>
					{currentOrganization.name}
				</span>
				<ArrowDropDown className='inline' />
			</Button>
			{state.isOpen && (
				<Popover state={state} triggerRef={ref} placement='bottom end'>
					<OrganizationSelectorMenu
						{...props}
						{...menuProps}
						items={[...items, {organization: null}]}
						onAction={async key => {
							const id = Number.parseInt(key as string, 10);
							if (!Number.isNaN(id)) {
								await updateActiveOrganization(id);
								window.location.href = '/my';
							}
						}}
					>
						{organization =>
							organization.organization ? (
								<Item key={organization.organization.id}>
									<div
										className={cx(
											'w-full p-2 text-stone-300 rounded border-b border-stone-700 max-w-64 truncate',
											organization.organization.id ===
												currentOrganization.id &&
												'font-bold',
										)}
									>
										{organization.organization.name}
									</div>
								</Item>
							) : (
								<Item key='new' href='/new-organization'>
									<div className='flex justify-between rounded p-2 text-stone-300 hover:bg-stone-800'>
										Nueva organización
										<Add className='ml-1 fill-current' />
									</div>
								</Item>
							)
						}
					</OrganizationSelectorMenu>
				</Popover>
			)}
		</>
	);
}
