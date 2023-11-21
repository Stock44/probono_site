'use client';
import React, {type Key, useMemo, useState} from 'react';
import dynamic from 'next/dynamic';
import {useQuery} from 'react-query';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';
import {Set} from 'immutable';
import {Item} from 'react-stately';
import ListBox from '@/components/list-box.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';

const SectorsMap = dynamic(async () => import('@/app/(my)/my/sectors/sectors-map.tsx'), {ssr: false});

export default function SectorsForm() {
	const {data} = useQuery('sectors', async () => {
		const response = await fetch('/api/sectors');
		return (await response.json()) as Array<Sector & {geom: Geometry}>;
	}, {
		staleTime: Number.POSITIVE_INFINITY,
	});

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(Set<Key>());

	const selectedSectors = useMemo(() => {
		if (data === undefined) {
			return [];
		}

		return data.filter(sector => selectedSectorKeys.has(sector.id));
	}, [data, selectedSectorKeys]);

	return (
		<div className='grow'>
			<div className='flex justify-between items-end mb-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Alcance geográfico
					</h1>
					<p className='text-stone-300'>
						¿En dónde trabaja tu organización?
					</p>
				</div>
				<Button type='submit'>
					<Icon iconName='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<div
				className='flex gap-4 h-[32rem]'>
				<SectorsMap sectors={data ?? []} selectedKeys={selectedSectorKeys} setSelectedKeys={setSelectedSectorKeys} className='h-full grow'/>
				<div className='w-64 border border-stone-800 rounded px-2 py-3 overflow-y-scroll scroll-smooth scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thin scrollbar-thumb-stone-50'>
					<ListBox
						items={selectedSectors} label='Sectores seleccionados' selectionMode='single'
						selectedKeys={[]} onSelectionChange={keys => {
							for (const key of keys) {
								setSelectedSectorKeys(selectedSectorKeys.remove(key));
							}
						}}>
						{
							sector => (
								<Item>
									<div className='w-full flex justify-between items-center'>
										{sector.name}
										<Icon iconName='remove' size='lg'/>
									</div>
								</Item>
							)
						}
					</ListBox>
				</div>

			</div>

		</div>
	);
}

