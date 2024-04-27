import React, {useRef} from 'react';
import {type GridNode} from '@react-types/grid';
import {type TableState} from 'react-stately';
import {useTableCell, useTableSelectionCheckbox} from 'react-aria';
import Checkbox from '@/components/checkbox.tsx';

export type TableCheckboxCellProps<T> = {
	readonly cell: GridNode<T>;
	readonly state: TableState<T>;
};

export default function TableCheckboxCell<T>(props: TableCheckboxCellProps<T>) {
	const {cell, state} = props;
	const cellRef = useRef<HTMLTableCellElement>(null);
	const {gridCellProps} = useTableCell(
		{node: cell},
		state,
		cellRef,
	);

	const {checkboxProps} = useTableSelectionCheckbox({
		key: cell.parentKey!,
	}, state);

	return (
		<td
			{...gridCellProps}
			ref={cellRef}
			className='px-4 border-y border-stone-800'
		>
			<Checkbox {...checkboxProps}/>
		</td>
	);
}
