import React, {type ReactNode} from 'react';
import TopBarFooterLayout from '@/components/top-bar-footer-layout.tsx';
import AccountButton from '@/app/(onboarding)/onboarding/account-button.tsx';
import MySectionLink from '@/app/(my)/my/my-section-link.tsx';
import {OrganizationDataProgressCard} from '@/app/(my)/my/organization-data-progress-card.tsx';
import Separator from '@/components/separator.tsx';

export type MyLayoutProps = {
	readonly children: ReactNode;
};

export default async function MyLayout(props: MyLayoutProps) {
	const {children} = props;
	return (
		<TopBarFooterLayout topBarItems={<AccountButton/>}>
			<div className='flex justify-center gap-8 max-w-7xl mx-auto w-full relative items-start'>
				<div className='flex-none flex flex-col gap-2 sticky top-8'>
					<p className='text-stone-300 font-bold text-sm mb-2 ps-2'>
						Menu
					</p>
					<MySectionLink iconName='home' root='/my'>Inicio</MySectionLink>
					<MySectionLink iconName='person' root='/my' slug='account'>Mi cuenta</MySectionLink>
					<p className='text-stone-300 font-bold text-sm mt-4 mb-2 ps-2'>
						Mi organización
					</p>
					<MySectionLink iconName='feed' root='/my' slug='general'>Información general</MySectionLink>
					<MySectionLink iconName='psychology' root='/my' slug='purpose'>Propósito</MySectionLink>
					<MySectionLink iconName='policy' root='/my' slug='legal'>Datos legales</MySectionLink>
					<MySectionLink iconName='location_on' root='/my' slug='location'>Ubicación</MySectionLink>
					<MySectionLink iconName='map' root='/my' slug='sectors'>Alcance geografico</MySectionLink>
				</div>
				<div className='flex-1'>
					<div className='flex gap-4 scrollbar-track-transparent scrollbar scrollbar-thumb-stone-50'>
						<OrganizationDataProgressCard/>
						<div className='border border-stone-800 p-4 rounded col-span-4 w-96'>
							<h2 className='text-stone-300  mb-2 font-bold'>
								En espera de aprobación.
							</h2>
							<p className='text-stone-400 text-sm mb-4'>
								Tu organización aun no ha sido aprobada para que aparezca en el sitio. Esta no se podrá ver en el mapa
								hasta que sea aprobada.
							</p>
						</div>
					</div>
					<Separator/>
					{children}
				</div>
			</div>
		</TopBarFooterLayout>

	);
}
