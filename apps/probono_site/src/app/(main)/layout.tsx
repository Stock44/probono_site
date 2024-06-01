import React, {type ReactNode} from 'react';
import Menu from '@material-design-icons/svg/round/menu.svg';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import SidebarTrigger from 'geostats-ui/sidebar-trigger';
import ALinkButton from 'geostats-ui/button/a-link-button';
import {SidebarTrigger, ALinkButton} from 'geostats-uid';
import NavLink from '@/app/(main)/nav-link.tsx';

export type MainLayoutProps = {
	readonly children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
	const {children} = props;

	return (
		<div>
			<TopBar>
				<div className='hidden px-4 lg:block'>
					<NavLink slug='organizations'>Organizaciones</NavLink>
				</div>
				<ALinkButton
					href='/api/auth/login?returnTo=/my'
					variant='secondary'
					className='hidden lg:block'
				>
					Iniciar sesión
				</ALinkButton>
				<ALinkButton
					href='/api/auth/signup?returnTo=/my'
					className='hidden lg:block'
				>
					Registro
				</ALinkButton>
				<SidebarTrigger
					icon={<Menu className='fill-current' />}
					variant='text'
					className='lg:hidden'
				>
					<div className='p-4'>
						<NavLink slug='' className='mb-4 block'>
							Inicio
						</NavLink>
						<NavLink slug='organizations' className='mb-4 block'>
							Organizaciones
						</NavLink>
						<ALinkButton
							href='/api/auth/login?returnTo=/my'
							size='sm'
							variant='outlined'
							className='mb-4 w-full'
						>
							Iniciar sesión
						</ALinkButton>
						<ALinkButton
							href='/api/auth/signup?returnTo=/my'
							size='sm'
							variant='primary'
							className='w-full'
						>
							Registro
						</ALinkButton>
					</div>
				</SidebarTrigger>
			</TopBar>
			<div className='min-h-[calc(100vh-theme(spacing.16))] w-full'>
				{children}
			</div>
			<Footer />
		</div>
	);
}
