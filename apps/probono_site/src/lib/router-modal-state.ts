import {type OverlayTriggerState} from 'react-stately';
import {useRouter} from 'next/navigation';

export default function useRouterModalState(): OverlayTriggerState {
	const router = useRouter();

	return {
		isOpen: true,
		close(): void {
			console.log('close');
			router.back();
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		open(): void {},
		setOpen(isOpen: boolean): void {
			console.log('set');
			if (!isOpen) {
				router.back();
			}
		},
		toggle(): void {
			console.log('toggle');
			if (this.isOpen) {
				router.back();
			}
		},
	};
}
