import React, {type ReactNode} from 'react';
import {redirect} from 'next/navigation';
import Feed from '@material-design-icons/svg/round/feed.svg';
import Home from '@material-design-icons/svg/round/home.svg';
import Person from '@material-design-icons/svg/round/person.svg';
import Psychology from '@material-design-icons/svg/round/psychology.svg';
import Policy from '@material-design-icons/svg/round/policy.svg';
import LocationOn from '@material-design-icons/svg/round/location_on.svg';
import Group from '@material-design-icons/svg/round/group.svg';
import Map from '@material-design-icons/svg/round/map.svg';
import Menu from '@material-design-icons/svg/round/menu.svg';
import MySectionLink from '@/app/(logged-in)/my/my-section-link.tsx';
import {getCurrentUserOrganizations, getUserFromSession, getUsersActiveOrganization} from '@/lib/models/user.ts';
import OrganizationSelectorButton from '@/components/organization-selector/organization-selector-button.tsx';
import AccountButton from '@/app/(logged-in)/onboarding/account-button.tsx';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import SidebarTrigger from '@/components/sidebar-trigger.tsx';
import LinkButton from '@/components/button/link-button.tsx';

export type MyLayoutProps = {
	readonly children: ReactNode;
};

export default async function MyLayout(props: MyLayoutProps) {
	const {children} = props;

	const user = await getUserFromSession();

	if (!user) {
		redirect('/onboarding');
	}

	if (user._count.organizations === 0) {
		redirect('/onboarding/organization');
	}

	const organizations = (await getCurrentUserOrganizations())!;

	const organization = await getUsersActiveOrganization();

	return (
		<div className='min-h-screen min-w-full'>
			<TopBar>
				<div className='hidden lg:flex gap-2'>
					{
						organizations && organizations.length > 0
            && <OrganizationSelectorButton items={organizations} currentOrganization={organization} className='max-w-64'/>
					}
					<AccountButton/>
				</div>
				<SidebarTrigger icon={<Menu className='fill-current'/>} variant='text' className='block lg:hidden'>
					<div className='p-4 flex flex-col gap-2'>
						<p className='text-stone-300 font-bold text-xs ps-2'>
							Organización actual:
						</p>
						{
							organizations.length > 0
              && <OrganizationSelectorButton items={organizations} currentOrganization={organization} className='w-full max-w-48 flex justify-between'/>
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
						<MySectionLink icon={<Group/>} root='/my' slug='members'>Miembros</MySectionLink>

						<LinkButton href='/api/auth/logout' className='mt-4 w-full' variant='outlined'>Cerrar sesión</LinkButton>
					</div>
				</SidebarTrigger>
			</TopBar>
			<div className='min-h-[calc(100vh-theme(spacing.16))] pb-32 pt-8 px-4 mt-16'>
				<div className='flex flex-wrap'>
					<div className='flex gap-8 max-w-7xl mx-auto w-full relative items-start'>
						<div className='flex-none flex-col gap-2 sticky top-8 hidden lg:flex '>
							<p className='text-stone-300 font-bold text-sm mb-2 ps-2'>
								Menú
							</p>
							<MySectionLink icon={<Home/>} root='/my'>Inicio</MySectionLink>
							<MySectionLink icon={<Person/>} root='/my' slug='account'>Mi cuenta</MySectionLink>
							<p className='text-stone-300 font-bold text-sm mt-4 mb-2 ps-2'>
								Mi organización
							</p>
							<MySectionLink icon={<Feed/>} root='/my' slug='general'>Información general</MySectionLink>
							<MySectionLink icon={<Psychology/>} root='/my' slug='purpose'>Propósito</MySectionLink>
							<MySectionLink icon={<Policy/>} root='/my' slug='legal'>Datos legales</MySectionLink>
							<MySectionLink icon={<LocationOn/>} root='/my' slug='location'>Ubicación</MySectionLink>
							<MySectionLink icon={<Map/>} root='/my' slug='sectors'>Alcance geografico</MySectionLink>
							<MySectionLink icon={<Group/>} root='/my' slug='members'>Miembros</MySectionLink>
						</div>
						{children}
					</div>
				</div>
			</div>
			<Footer/>
		</div>

	);
}
