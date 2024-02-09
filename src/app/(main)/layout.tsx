import React, {type ReactNode} from 'react';
import AccountButtons from '@/app/account-buttons.tsx';
import TopBarFooterLayout from '@/components/top-bar-footer-layout.tsx';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import LinkButton from '@/components/link-button.tsx';

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
					Registra tu organización
				</LinkButton>
			</TopBar>
			<div className='w-full min-h-[calc(100vh-theme(spacing.16))]'>
				{children}
			</div>
			<Footer/>
		</div>
	);
}
