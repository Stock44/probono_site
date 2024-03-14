import React, {type ReactNode} from 'react';
import Menu from '@material-design-icons/svg/round/menu.svg';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import SidebarTrigger from '@/components/sidebar-trigger.tsx';
import ALinkButton from '@/components/button/a-link-button.tsx';
import NavLink from '@/app/(main)/nav-link.tsx';

export type MainLayoutProps = {
	readonly children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
	const {children} = props;

	return (
		<div>
			<TopBar>
				<div className='flex gap-8 px-4 hidden lg:block'>
					<NavLink slug='organizations'>
						Organizaciones
					</NavLink>
				</div>
				<ALinkButton href='/api/auth/login?returnTo=/my' variant='secondary' className='hidden lg:block'>
					Iniciar sesión
				</ALinkButton>
				<ALinkButton href='/api/auth/signup?returnTo=/my' className='hidden lg:block'>
					Registro
				</ALinkButton>
				<SidebarTrigger icon={<Menu className='fill-current'/>} variant='text' className='lg:hidden'>
					<div className='p-4'>
						<NavLink slug='' className='block mb-4'>
							Inicio
						</NavLink>
						<NavLink slug='organizations' className='block mb-4'>
							Organizaciones
						</NavLink>
						<ALinkButton href='/api/auth/login?returnTo=/my' size='sm' variant='outlined' className='w-full mb-4'>
							Iniciar sesión
						</ALinkButton>
						<ALinkButton href='/api/auth/signup?returnTo=/my' size='sm' variant='primary' className='w-full'>
							Registro
						</ALinkButton>
					</div>
				</SidebarTrigger>
			</TopBar>
			<div className='w-full min-h-[calc(100vh-theme(spacing.16))]'>
				{children}
			</div>
			<Footer/>
		</div>
	);
}
