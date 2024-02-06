'use client';

import React from 'react';
import Menu from '@material-design-icons/svg/round/menu.svg';
import Home from '@material-design-icons/svg/round/home.svg';
import Person from '@material-design-icons/svg/round/person.svg';
import Feed from '@material-design-icons/svg/round/feed.svg';
import Psychology from '@material-design-icons/svg/round/psychology.svg';
import Policy from '@material-design-icons/svg/round/policy.svg';
import LocationOn from '@material-design-icons/svg/round/location_on.svg';
import Map from '@material-design-icons/svg/round/map.svg';
import Link from 'next/link';
import MySectionLink from '@/app/(logged-in)/my/my-section-link.tsx';
import SidebarTrigger from '@/components/sidebar-trigger.tsx';
import OrganizationSelectorButton from '@/components/organization-selector/organization-selector-button.tsx';
import type {OrganizationLogoInfo} from '@/components/organization-selector/organization-option.ts';
import Button from '@/components/button.tsx';

export type MyOrganizationSidebarProps = {
	readonly className?: string;
	readonly organization: OrganizationLogoInfo;
	readonly organizations: OrganizationLogoInfo[];
};

export default function MyOrganizationSidebar(props: MyOrganizationSidebarProps) {
	const {className, organizations, organization} = props;
	return (
		<SidebarTrigger icon={<Menu className='fill-current'/>} variant='text' className={className}>
			{
				close => (
					<div className='p-4 flex flex-col gap-2'>
						<p className='text-stone-300 font-bold text-xs ps-2'>
							Organización actual:
						</p>
						{
							organizations.length > 0
              && <OrganizationSelectorButton items={organizations} currentOrganization={organization} className='w-full flex justify-between'/>
						}
						<MySectionLink icon={<Home/>} root='/my' className='mt-4'>Inicio</MySectionLink>
						<MySectionLink icon={<Person/>} root='/my' slug='account'>Mi cuenta</MySectionLink>
						<p className='text-stone-300 font-bold text-xs mt-4 ps-2'>
							Mi organización
						</p>
						<MySectionLink icon={<Feed/>} root='/my' slug='general'>Información general</MySectionLink>
						<MySectionLink icon={<Psychology/>} root='/my' slug='purpose'>Propósito</MySectionLink>
						<MySectionLink icon={<Policy/>} root='/my' slug='legal'>Datos legales</MySectionLink>
						<MySectionLink icon={<LocationOn/>} root='/my' slug='location'>Ubicación</MySectionLink>
						<MySectionLink icon={<Map/>} root='/my' slug='sectors'>Alcance geografico</MySectionLink>

						<Link href='/api/auth/logout' className='mt-4'>
							<Button variant='outlined' className='w-full'>Cerrar sesión</Button>
						</Link>
					</div>
				)
			}
		</SidebarTrigger>
	);
}
