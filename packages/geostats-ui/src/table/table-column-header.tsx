import type {GridNode} from '@react-types/grid';
import type {TableState} from 'react-stately';
import React, {useRef} from 'react';
import {mergeProps, useFocusRing, useTableColumnHeader} from 'react-aria';
import {cx} from '@/cva.ts';

export type TableColumnHeaderProps<T> = {
	readonly column: GridNode<T>;
	readonly state: TableState<T>;
};

export function TableColumnHeader<T>(props: TableColumnHeaderProps<T>) {
	const {column, state} = props;
	const headerRef = useRef<HTMLTableHeaderCellElement>(null);

	const {columnHeaderProps} = useTableColumnHeader(
		{node: column},
		state,
		headerRef,
	);

	const {isFocusVisible, focusProps} = useFocusRing();
	const arrowIcon =
		state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';

	return (
		<th
			{...mergeProps(columnHeaderProps, focusProps)}
			ref={headerRef}
			colSpan={column.colspan}
			className={cx(
				'p-4 outline-none cursor-default',
				isFocusVisible && 'shadow-stone-50',
				(column.colspan ?? 0) > 1 ? 'text-center' : 'text-left',
			)}
		>
			{column.rendered}
			{column.props.allowsSorting && (
				<span
					aria-hidden='true'
					className={cx(
						'px-0 py-1 ',
						state.sortDescriptor?.column === column.key
							? 'visible'
							: 'hidden',
					)}
				>
					{arrowIcon}
				</span>
			)}
		</th>
	);
}
