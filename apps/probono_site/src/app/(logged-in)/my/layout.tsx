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
import {
	getCurrentUserOrganizations,
	getUserFromSession,
	getUsersActiveOrganization,
} from '@/lib/models/user.ts';
import OrganizationSelectorButton from '@/components/organization-selector/organization-selector-button.tsx';
import AccountButton from '@/app/(logged-in)/onboarding/account-button.tsx';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import SidebarTrigger from 'geostats-ui/sidebar-trigger.tsx';
import LinkButton from 'geostats-ui/button/link-button.tsx';

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
				<div className='hidden gap-2 lg:flex'>
					{organizations && organizations.length > 0 && (
						<OrganizationSelectorButton
							items={organizations}
							currentOrganization={organization}
							className='max-w-64'
						/>
					)}
					<AccountButton />
				</div>
				<SidebarTrigger
					icon={<Menu className='fill-current' />}
					variant='text'
					className='block lg:hidden'
				>
					<div className='flex flex-col gap-2 p-4'>
						<p className='ps-2 text-xs font-bold text-stone-300'>
							Organización actual:
						</p>
						{organizations.length > 0 && (
							<OrganizationSelectorButton
								items={organizations}
								currentOrganization={organization}
								className='flex w-full max-w-48 justify-between'
							/>
						)}
						<MySectionLink
							icon={<Home />}
							root='/my'
							className='mt-4'
						>
							Inicio
						</MySectionLink>
						<MySectionLink
							icon={<Person />}
							root='/my'
							slug='account'
						>
							Mi cuenta
						</MySectionLink>
						<p className='mt-4 ps-2 text-xs font-bold text-stone-300'>
							Mi organización
						</p>
						<MySectionLink
							icon={<Feed />}
							root='/my'
							slug='general'
						>
							Información general
						</MySectionLink>
						<MySectionLink
							icon={<Psychology />}
							root='/my'
							slug='purpose'
						>
							Propósito
						</MySectionLink>
						<MySectionLink
							icon={<Policy />}
							root='/my'
							slug='legal'
						>
							Datos legales
						</MySectionLink>
						<MySectionLink
							icon={<LocationOn />}
							root='/my'
							slug='location'
						>
							Ubicación
						</MySectionLink>
						<MySectionLink icon={<Map />} root='/my' slug='sectors'>
							Alcance geografico
						</MySectionLink>
						<MySectionLink
							icon={<Group />}
							root='/my'
							slug='members'
						>
							Miembros
						</MySectionLink>

						<LinkButton
							href='/api/auth/logout'
							className='mt-4 w-full'
							variant='outlined'
						>
							Cerrar sesión
						</LinkButton>
					</div>
				</SidebarTrigger>
			</TopBar>
			<div className='mt-16 min-h-[calc(100vh-theme(spacing.16))] px-4 pb-32 pt-8'>
				<div className='flex flex-wrap'>
					<div className='relative mx-auto flex w-full max-w-7xl items-start gap-8'>
						<div className='sticky top-8 hidden flex-none flex-col gap-2 lg:flex '>
							<p className='mb-2 ps-2 text-sm font-bold text-stone-300'>
								Menú
							</p>
							<MySectionLink icon={<Home />} root='/my'>
								Inicio
							</MySectionLink>
							<MySectionLink
								icon={<Person />}
								root='/my'
								slug='account'
							>
								Mi cuenta
							</MySectionLink>
							<p className='mb-2 mt-4 ps-2 text-sm font-bold text-stone-300'>
								Mi organización
							</p>
							<MySectionLink
								icon={<Feed />}
								root='/my'
								slug='general'
							>
								Información general
							</MySectionLink>
							<MySectionLink
								icon={<Psychology />}
								root='/my'
								slug='purpose'
							>
								Propósito
							</MySectionLink>
							<MySectionLink
								icon={<Policy />}
								root='/my'
								slug='legal'
							>
								Datos legales
							</MySectionLink>
							<MySectionLink
								icon={<LocationOn />}
								root='/my'
								slug='location'
							>
								Ubicación
							</MySectionLink>
							<MySectionLink
								icon={<Map />}
								root='/my'
								slug='sectors'
							>
								Alcance geografico
							</MySectionLink>
							<MySectionLink
								icon={<Group />}
								root='/my'
								slug='members'
							>
								Miembros
							</MySectionLink>
						</div>
						{children}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
