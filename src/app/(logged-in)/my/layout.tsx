import React, {type ReactNode} from 'react';
import {notFound, redirect} from 'next/navigation';
import Feed from '@material-design-icons/svg/round/feed.svg';
import Home from '@material-design-icons/svg/round/home.svg';
import Person from '@material-design-icons/svg/round/person.svg';
import Psychology from '@material-design-icons/svg/round/psychology.svg';
import Policy from '@material-design-icons/svg/round/policy.svg';
import LocationOn from '@material-design-icons/svg/round/location_on.svg';
import Map from '@material-design-icons/svg/round/map.svg';
import MySectionLink from '@/app/(logged-in)/my/my-section-link.tsx';
import Separator from '@/components/separator.tsx';
import {OrganizationDataProgressCard} from '@/app/(logged-in)/my/organization-data-progress-card.tsx';
import {getSessionUserOrganization, getUserFromSession} from '@/lib/models/user.ts';

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

	return (
		<div className='flex-1'>
			<div className='flex gap-8 max-w-7xl mx-auto w-full relative items-start'>
				<div className='flex-none flex flex-col gap-2 sticky top-8'>
					<p className='text-stone-300 font-bold text-sm mb-2 ps-2'>
						Menu
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
				</div>
				<div className='grow w-0'>
					<div className='flex gap-4 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-stone-400 scrollbar-track-transparent'>
						<OrganizationDataProgressCard className='shrink-0'/>
						<div className='border border-stone-800 shrink-0 p-4 rounded col-span-4 w-96'>
							<h2 className='text-stone-300  mb-2 font-bold'>
								En espera de aprobación.
							</h2>
							<p className='text-stone-400 text-sm mb-4'>
								Tu organización aun no ha sido aprobada para que aparezca en el sitio. Esta no se podrá ver en el mapa
								hasta que sea aprobada.
							</p>
						</div>
					</div>
					<Separator className='mt-4'/>
					{children}
				</div>
			</div>
		</div>
	);
}
