'use client';
import React, {useMemo, useState} from 'react';
import dynamic from 'next/dynamic';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';
import {Seq, Set} from 'immutable';
import {Item, Section, useListData} from 'react-stately';
import Save from '@material-design-icons/svg/round/save.svg';
import Remove from '@material-design-icons/svg/round/remove.svg';
import ListBox from '@/components/list-box.tsx';
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
		municipalityName: string;
	}>;
};

export default function SectorsForm(props: SectorFormProps) {
	const {
		sectors,
	} = props;

	const sectorsList = useListData({
		initialItems: sectors,
	});

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(Set<number>());
	const selectedSectors = useMemo(() =>
		[
			...Seq(selectedSectorKeys).map(key => sectorsList.getItem(key))
				.groupBy(sector => sector.municipalityName),
		].map(([name, sectors]) => ({
			name,
			sectors,
		}))
	, [sectorsList, selectedSectorKeys]);

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
					<Save className='fill-current'/>
					Guardar
				</Button>
			</div>
			<div
				className='flex gap-4 h-[32rem]'>
				<SectorsMap
					sectors={sectors} selectedKeys={selectedSectorKeys} setSelectedKeys={key => {
						setSelectedSectorKeys(key as Set<number>);
					}}
					className='h-full grow'/>
				<div className='w-64 border border-stone-800 rounded px-2 py-3 overflow-y-scroll scroll-smooth scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thin scrollbar-thumb-stone-50'>
					<ListBox
						items={selectedSectors} label='Sectores seleccionados'>
						{
							municipality => (
								<Section key={municipality.name} items={municipality.sectors} title={municipality.name}>
									{
										sector => (
											<Item textValue={sector.name}>
												<div className='w-full flex items-center'>
													<span className='grow'>
														{sector.name}
													</span>
													<Button variant='text' className='enabled:hover:bg-stone-700'>
														<Remove className='fill-current'/>
													</Button>
												</div>
											</Item>
										)
									}
								</Section>
							)
						}
					</ListBox>
				</div>

			</div>

		</div>
	);
}

