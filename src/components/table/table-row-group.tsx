import React, {type ReactNode} from 'react';
import {useTableRowGroup} from 'react-aria';
import {cx} from '@/lib/cva.ts';
import IntrinsicElements = JSX.IntrinsicElements;

export type TableRowGroupProps = {
	readonly type: keyof IntrinsicElements;
	readonly children: ReactNode;
};

export default function TableRowGroup<T>(props: TableRowGroupProps) {
	const {type: Element, children} = props;

	const {rowGroupProps} = useTableRowGroup();

	return (
		<Element
			{...rowGroupProps}
			className={cx(Element === 'thead' && 'border-b border-stone-700')}
		>
			{children}
		</Element>
	);
}
