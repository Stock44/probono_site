'use client';
import React, {type ReactNode, useRef} from 'react';
import {useTableHeaderRow} from 'react-aria';
import type {GridNode} from '@react-types/grid';
import type {TableState} from 'react-stately';

export type TableHeaderRowProps<T> = {
	readonly item: GridNode<T>;
	readonly state: TableState<T>;
	readonly children: ReactNode;
};

export function TableHeaderRow<T>(props: TableHeaderRowProps<T>) {
	const {item, state, children} = props;

	const headerRef = useRef<HTMLTableRowElement>(null);

	const {rowProps} = useTableHeaderRow({node: item}, state, headerRef);

	return (
		<tr {...rowProps} ref={headerRef}>
			{children}
		</tr>
	);
}
