import React, {useRef} from 'react';
import {type AriaTableProps, useTable} from 'react-aria';
import {type TableStateProps, useTableState} from 'react-stately';
import TableRowGroup from '@/table/table-row-group.tsx';
import {TableHeaderRow} from '@/table/table-header-row.tsx';
import TableSelectAllCell from '@/table/table-select-all-cell.tsx';
import {TableColumnHeader} from '@/table/table-column-header.tsx';
import TableRow from '@/table/table-row.tsx';
import TableCheckboxCell from '@/table/table-checkbox-cell.tsx';
import TableCell from '@/table/table-cell.tsx';
import {cx} from '@/cva.ts';

export type TableProps<T> = {
	readonly className?: string;
} & AriaTableProps<T> &
	TableStateProps<T>;

export default function Table<T extends object>(props: TableProps<T>) {
	const {className} = props;

	const state = useTableState<T>(props);

	const tableRef = useRef<HTMLTableElement>(null);

	const {collection} = state;

	const {gridProps} = useTable(props, state, tableRef);

	return (
		<table
			{...gridProps}
			ref={tableRef}
			className={cx('border-collapse', className)}
		>
			<TableRowGroup type='thead'>
				{collection.headerRows.map(headerRow => (
					<TableHeaderRow
						key={headerRow.key}
						item={headerRow}
						state={state}
					>
						{[...collection.getChildren!(headerRow.key)].map(
							column =>
								column.props.isSelectionCell ? (
									<TableSelectAllCell
										key={column.key}
										column={column}
										state={state}
									/>
								) : (
									<TableColumnHeader
										key={column.key}
										column={column}
										state={state}
									/>
								),
						)}
					</TableHeaderRow>
				))}
			</TableRowGroup>
			<TableRowGroup type='tbody'>
				{
					// The following is deprecated, but the body's children are not accesible via collection.getChildren
					[...collection.body.childNodes].map(row => (
						<TableRow key={row.key} item={row} state={state}>
							{[...collection.getChildren!(row.key)].map(cell =>
								cell.props.isSelectionCell ? (
									<TableCheckboxCell
										key={cell.key}
										cell={cell}
										state={state}
									/>
								) : (
									<TableCell
										key={cell.key}
										cell={cell}
										state={state}
									/>
								),
							)}
						</TableRow>
					))
				}
			</TableRowGroup>
		</table>
	);
}
