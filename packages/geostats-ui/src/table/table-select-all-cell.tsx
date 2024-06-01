import React, {useRef} from 'react';
import {type GridNode} from '@react-types/grid';
import {type TableState} from 'react-stately';
import {
	useTableColumnHeader,
	useTableSelectAllCheckbox,
	VisuallyHidden,
} from 'react-aria';
import {Checkbox} from '@/checkbox.tsx';

export type TableSelectAllCellProps<T> = {
	readonly column: GridNode<T>;
	readonly state: TableState<T>;
};

export default function TableSelectAllCell<T>(
	props: TableSelectAllCellProps<T>,
) {
	const {column, state} = props;
	const cellRef = useRef<HTMLTableHeaderCellElement>(null);
	const {columnHeaderProps} = useTableColumnHeader(
		{node: column},
		state,
		cellRef,
	);
	const {checkboxProps} = useTableSelectAllCheckbox(state);

	return (
		<th {...columnHeaderProps} ref={cellRef} className='px-4'>
			{state.selectionManager.selectionMode === 'single' ? (
				<VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
			) : (
				<Checkbox {...checkboxProps} />
			)}
		</th>
	);
}
