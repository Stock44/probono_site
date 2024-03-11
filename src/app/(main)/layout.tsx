import React, {type ReactNode} from 'react';
import Menu from '@material-design-icons/svg/round/menu.svg';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import SidebarTrigger from '@/components/sidebar-trigger.tsx';
import ALinkButton from '@/components/button/a-link-button.tsx';

export type MainLayoutProps = {
	readonly children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
	const {children} = props;

	return (
		<div>
			<TopBar>
				<ALinkButton href='/api/auth/login?returnTo=/my' variant='secondary' className='hidden lg:block'>
					Iniciar sesión
				</ALinkButton>
				<ALinkButton href='/api/auth/signup?returnTo=/my' className='hidden lg:block'>
					Registro
				</ALinkButton>
				<SidebarTrigger icon={<Menu className='fill-current'/>} variant='text' className='lg:hidden'>
					<div className='p-4'>
						<ALinkButton href='/api/auth/login?returnTo=/my' variant='outlined' className='w-full mb-4'>
							Iniciar sesión
						</ALinkButton>
						<ALinkButton href='/api/auth/signup?returnTo=/my' variant='primary' className='w-full'>
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
