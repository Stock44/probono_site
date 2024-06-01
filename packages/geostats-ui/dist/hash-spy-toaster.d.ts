import { ToastContent } from './toast.js';
import 'react/jsx-runtime';
import 'react';
import '@react-stately/toast';

/**
 * Represents the properties for HashSpyToaster component.
 */
type HashSpyToasterProps = {
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
declare function HashSpyToaster(props: HashSpyToasterProps): null;

export { HashSpyToaster, type HashSpyToasterProps };
