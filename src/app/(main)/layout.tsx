import React, {type ReactNode} from 'react';
import Menu from '@material-design-icons/svg/round/menu.svg';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import LinkButton from '@/components/link-button.tsx';
import SidebarTrigger from '@/components/sidebar-trigger.tsx';

export type MainLayoutProps = {
	readonly children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
	const {children} = props;

	return (
		<div>
			<TopBar>
				<LinkButton href='/api/auth/login' variant='secondary' className='hidden lg:block'>
					Iniciar sesión
				</LinkButton>
				<LinkButton href='/api/auth/register' className='hidden lg:block'>
					Registro
				</LinkButton>
				<SidebarTrigger icon={<Menu className='fill-current'/>} variant='text' className='lg:hidden'>
					<div className='p-4'>
						<LinkButton href='/api/auth/register' variant='primary' className='w-full'>
							Registro
						</LinkButton>
						<LinkButton href='/api/auth/login' variant='outlined' className='w-full mb-4'>
							Iniciar sesión
						</LinkButton>
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
