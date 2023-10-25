import {useEffect, useRef} from 'react';
import Immutable, {type List} from 'immutable';
import type Fuse from 'fuse.js';
import Indexed = Immutable.Collection.Indexed;

/**
 * Creates and initializes a Fuse instance lazily using the provided collection and options.
 *
 * @template T - The type of elements in the collection.
 *
 * @param {Array<T>} items - The collection to be searched.
 * @param {Fuse.IFuseOptions<T>} [options] - The options to customize the search behavior.
 *
 * @returns {Fuse<T> | undefined} - The initialized Fuse instance, or undefined if the Fuse instance is not yet available.
 */
export default function useFuse<T>(items: List<T>, options?: Fuse.IFuseOptions<T>): Fuse<T> | undefined {
	const fuseRef = useRef<Fuse<T>>();

	useEffect(() => {
		void (async () => {
			const fuse = (await import('fuse.js'));
			fuseRef.current = new fuse.default<T>(items.toArray(), options);
		})();
	}, [items, options]);
	return fuseRef.current;
}
