import React, {type Key, useMemo} from 'react';
import {useListState} from 'react-stately';
import {type List, Seq, Set} from 'immutable';
import clsx from 'clsx';
import {type CollectionElement} from '@react-types/shared';
import {useId} from '@react-aria/utils';
import ComboBox from '@/components/combo-box.tsx';
import TagGroup from '@/components/tag-group.tsx';

export type ComboBoxTagMultiSelectProps<T extends Record<string, unknown>> = {
	readonly label?: string;
	readonly children: (item: T) => CollectionElement<T>;
	readonly items: List<T>;
	readonly filteredKeys: Set<Key>;
	readonly filterText: string;
	readonly setFilterText: (filterText: string) => void;
	readonly selectedKeys: Set<Key> | 'all';
	readonly setSelectedKeys: (keys: Set<Key> | 'all') => void;
	readonly className?: string;
	readonly searchPlaceholder?: string;
};

export default function ComboBoxTagMultiSelect<T extends Record<string, unknown>>(props: ComboBoxTagMultiSelectProps<T>) {
	const {items, filteredKeys, setSelectedKeys, filterText, setFilterText, selectedKeys, children, label, className, searchPlaceholder} = props;
	const {collection, selectionManager} = useListState<T>({
		items,
		children,
		selectedKeys,
		onSelectionChange(keys) {
			setSelectedKeys(Set(keys));
		},
		selectionMode: 'multiple',
	});

	const id = useId();

	const selectedItems = useMemo(() => Seq(selectionManager.selectedKeys).map(key => collection.getItem(key)!.value!).toList(), [collection, selectionManager]);
	const filteredItems = useMemo(() => Seq(filteredKeys).map(key => collection.getItem(key)!.value!).toList(), [collection, filteredKeys]);

	return (
		<div className={clsx('group', className)}>
			{
				label === undefined ? null : <p className='text-stone-300 text-sm group-focus-within:text-stone-50' id={id}>
					{label}
				</p>
			}

			<TagGroup
				aria-labelledby={id}
				items={selectedItems}
				className={clsx((selectedKeys === 'all' || selectedKeys.size > 0) && 'mb-2')}
				onRemove={keys => {
					for (const key of keys) {
						selectionManager.toggleSelection(key);
					}
				}}
			>
				{children}
			</TagGroup>
			<ComboBox
				aria-labelledby={id}
				placeholder={searchPlaceholder}
				items={filteredItems} inputValue={filterText}
				onInputChange={setFilterText}
				onSelectionChange={(key: Key) => {
					if (key === null) {
						if (filterText !== '') {
							setFilterText('');
						}

						return;
					}

					setFilterText('');
					if (selectedKeys === 'all') {
						return;
					}

					setSelectedKeys(selectedKeys.add(key));
				}}>
				{children}
			</ComboBox>
		</div>

	);
}
