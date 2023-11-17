import React, {type ReactNode} from 'react';
import AccountButtons from '@/app/account-buttons.tsx';
import TopBarFooterLayout from '@/components/top-bar-footer-layout.tsx';

export type MainLayoutProps = {
	readonly children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
	const {children} = props;

	return (
		<TopBarFooterLayout topBarItems={<AccountButtons/>}>
			{children}
		</TopBarFooterLayout>
	);
}
