import React, {type Key, useMemo, useState} from 'react';
import {type Set as ImmutableSet, List, Seq} from 'immutable';
import {Item, type ListData, type ListProps, type Node, Section, useListData, useListState} from 'react-stately';
import {type OrganizationActivity, type OrganizationActivityCategory} from '@prisma/client';
import ComboBox from '@/components/combo-box.tsx';
import useFuse from '@/lib/hooks/use-fuse.ts';
import ListPrioritizer from '@/components/list-prioritizer.tsx';
import {type SearchableListData} from '@/lib/hooks/use-searchable-list-data.ts';

export type ActivityPrioritySelectorProps = {
	readonly activities: SearchableListData<OrganizationActivity>;
	readonly label: string;
	readonly prioritizerLabel: string;
};

export default function ActivityPrioritySelector(props: ActivityPrioritySelectorProps) {
	const {activities, label, prioritizerLabel} = props;

	const {items, selectedKeys, setSelectedKeys, moveBefore, moveAfter, filteredKeys, getItem, filterText, setFilterText} = activities;

	const selectedItems = useMemo(() => {
		if (selectedKeys === 'all') {
			return items;
		}

		return items.filter(items => selectedKeys.has(items.id));
	}, [items, selectedKeys]);

	const filteredItems = useMemo(() => filteredKeys.toList().map(key => getItem(key)), [filteredKeys, getItem]);

	return (
		<>
			<ComboBox
				aria-label='Ingresa el nombre de un actividad.'
				placeholder='Escribe aquí para buscar'
				className='mb-4'
				label={label}
				items={filteredItems} inputValue={filterText} menuTrigger='focus'
				selectedKey={null}
				onInputChange={setFilterText} onSelectionChange={(key: Key) => {
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
				{
					activity => (
						<Item>
							{activity.name}
						</Item>
					)
				}
			</ComboBox>
			{
				selectedItems.size === 0 ? null
					: <ListPrioritizer
						className='mb-4'
						label={prioritizerLabel}
						items={selectedItems} onRemove={key => {
							if (selectedKeys === 'all') {
								setSelectedKeys(items.map(item => item.id as Key).toSet().remove(key));
								return;
							}

							setSelectedKeys(selectedKeys.remove(key));
						}} onReorder={(key, previous, next) => {
							if (previous !== undefined) {
								moveBefore(previous, [key]);
								return;
							}

							if (next !== undefined) {
								moveAfter(next, [key]);
							}
						}}>
						{
							activity => (
								<Item>{activity.name}</Item>
							)
						}
					</ListPrioritizer>
			}

		</>
	);
}
