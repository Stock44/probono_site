import {useRef, type RefObject} from 'react';

export default function useOwnRefOr<T>(ref: RefObject<T> | undefined) {
	const ownRef = useRef(null);
	return ref ?? ownRef;
}
