import { List } from 'immutable';
import Fuse, { IFuseOptions } from 'fuse.js';

/**
 * Creates and initializes a Fuse instance lazily using the provided collection and options.
 *
 * @template T - The type of elements in the collection.
 *
 * @param {Array<T>} items - The collection to be searched.
 * @param {IFuseOptions<T>} [options] - The options to customize the search behavior.
 *
 * @returns {Fuse<T> | undefined} - The initialized Fuse instance, or undefined if the Fuse instance is not yet available.
 */
declare function useFuse<T>(items: List<T>, options?: IFuseOptions<T>): Fuse<T> | undefined;

export { useFuse as default };
