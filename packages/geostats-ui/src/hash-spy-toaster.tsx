'use client';

import {useEffect} from 'react';
import {type ToastContent, useToasts} from './toast.tsx';

/**
 * Represents the properties for HashSpyToaster component.
 */
export type HashSpyToasterProps = {
	readonly toast: ToastContent;
	readonly hash: string;
};

/**
 * Displays a toast message if the current hash matches one of the specified hashes.
 *
 * @param {HashSpyToasterProps} props - The props object containing toast and hash values.
 *
 * @returns {null} - This method does not return any value.
 */
export function HashSpyToaster(props: HashSpyToasterProps): null {
	const {toast, hash} = props;

	const toasts = useToasts();

	useEffect(() => {
		const hashes = window.location.hash.slice(1).split(',');
		if (hashes.includes(hash)) {
			toasts.add(toast);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toast, hash]);

	return null;
}
