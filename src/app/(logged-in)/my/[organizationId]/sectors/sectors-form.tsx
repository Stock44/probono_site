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

const SectorsMap = dynamic(async () => import('@/app/(logged-in)/my/[organizationId]/sectors/sectors-map.tsx'),
	{
		ssr: false,
		loading(props) {
			return <div className='w-full h-full animate-pulse bg-stone-900 rounded'/>;
		},
	});

export type SectorFormProps = {
	readonly sectors: Array<Sector & {
		geom: Geometry;
	}>;
};

export default function SectorsForm(props: SectorFormProps) {
	const {
		sectors,
	} = props;

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(Set<Key>());

	const selectedSectors = useMemo(() => sectors.filter(sector => selectedSectorKeys.has(sector.id)), [sectors, selectedSectorKeys]);

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
					<Icon name='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<div
				className='flex gap-4 h-[32rem]'>
				<SectorsMap sectors={sectors} selectedKeys={selectedSectorKeys} setSelectedKeys={setSelectedSectorKeys} className='h-full grow'/>
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
										<Icon name='remove' size='lg'/>
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

