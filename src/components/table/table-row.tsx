import React, {type ReactNode, useRef} from 'react';
import {type GridNode} from '@react-types/grid';
import {type TableState} from 'react-stately';
import {useTableRow} from 'react-aria';
import {cx} from '@/lib/cva.ts';

export type TableRowProps<T> = {
	readonly item: GridNode<T>;
	readonly children: ReactNode;
	readonly state: TableState<T>;
};

export default function TableRow<T>(props: TableRowProps<T>) {
	const {
		item,
		children,
		state,
	} = props;
	const rowRef = useRef<HTMLTableRowElement>(null);
	const isSelected = state.selectionManager.isSelected(item.key);

	const {rowProps} = useTableRow(
		{node: item},
		state,
		rowRef,
	);

	return (
		<tr
			{...rowProps}
			ref={rowRef}
			className={cx(
				'outline-none cursor-default',
				isSelected && 'text-stone-50 bg-stone-900',
			)}
		>
			{children}
		</tr>
	);
}
