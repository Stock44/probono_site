'use client';
import {createContext, useContext} from 'react';

export const modalContext = createContext<(() => void) | null>(null);

export function useCloseModal(): () => void {
	const closeModal = useContext(modalContext);

	if (!closeModal) {
		throw new Error('useCloseModal not used within a modal');
	}

	return closeModal;
}
