'use client';
import React, {type ReactNode} from 'react';
import Modal from '@/components/modal.tsx';
import useRouterModalState from '@/lib/router-modal-state.ts';

export type RouterModalProps = {
	readonly children: ReactNode;
};

export default function RouterModal(props: RouterModalProps) {
	const {children} = props;
	const state = useRouterModalState();
	return (
		<Modal state={state}>
			{children}
		</Modal>
	);
}
