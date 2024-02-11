import React, {type ReactNode} from 'react';
import RouterModal from '@/components/router-modal.tsx';

export type AccountLayoutProps = {
	readonly children: ReactNode;
	readonly modal: ReactNode;
};

export default function AccountLayout(props: AccountLayoutProps) {
	const {children, modal} = props;
	return (
		<>
			{children}
			{modal}
		</>
	);
}
