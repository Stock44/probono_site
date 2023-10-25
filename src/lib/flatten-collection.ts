import {type Collection, type Node} from 'react-stately';
import {Seq} from 'immutable';
import invariant from 'ts-tiny-invariant';

export default function flattenCollection<T>(collection: Collection<Node<T>>) {
	return flattenCollectionHelper(collection, Seq(collection)).toList();
}

function flattenCollectionHelper<T>(collection: Collection<Node<T>>, iterator: Seq.Indexed<Node<T>>): Seq.Indexed<Node<T>> {
	invariant(collection.getChildren !== undefined);

	// eslint-disable-next-line unicorn/no-array-reduce
	return iterator.reduce((accumulator: Seq.Indexed<Node<T>>, node) => {
		if (node.type === 'section') {
			// eslint-disable-next-line unicorn/prefer-spread
			return accumulator.concat(flattenCollectionHelper(collection, Seq(collection.getChildren!(node.key))));
		}

		// eslint-disable-next-line unicorn/prefer-spread
		return accumulator.concat(node);
	}, Seq.Indexed());
}
