import {
	type ReactNode as RN,
	type Ref as R,
	type RefAttributes as RA,
} from 'react';

declare module 'react' {
	function forwardRef<T, P = Record<string, unknown>>(
		render: (props: P, ref: R<T>) => RN | undefined,
	): (props: P & RA<T>) => RN | undefined;
}
