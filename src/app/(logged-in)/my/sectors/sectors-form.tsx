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
import Button from '@/components/button/button.tsx';
import {type ServerActionResult} from '@/lib/server-action-result.ts';
import {useToasts} from '@/components/toast.tsx';
import LoadingSpinner from '@/components/loading-spinner.tsx';

const SectorsMap = dynamic(async () => import('@/app/(logged-in)/my/sectors/sectors-map.tsx'),
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
	readonly organization: {
		sectors: Array<{
			id: number;
		}>;
	};
	readonly action: (sectorIds: number[]) => Promise<ServerActionResult>;
};

export default function SectorsForm(props: SectorFormProps) {
	const {
		sectors,
		organization,
		action,
	} = props;

	const sectorsList = useListData({
		initialItems: sectors,
	});

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(() => Set(organization.sectors.map(sector => sector.id)));
	const {add} = useToasts();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();
	const selectedSectors = useMemo(() =>

		Seq(selectedSectorKeys).map(key => sectorsList.getItem(key))
			.groupBy(sector => sector.municipalityId)
			.map((sectors, id) => ({
				name: sectors.first()!.municipalityName,
				id,
				sectors: sectors.sortBy(sector => sector.name),
			}))
			.toList()
			.sortBy(municipality => municipality.name)
	, [sectorsList, selectedSectorKeys]);

	return (
		<div className='grow'>
			<div className='flex items-end mb-4 flex-wrap gap-3'>
				<div className='w-full lg:w-auto'>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Alcance geográfico
					</h1>
					<p className='text-stone-300'>
						¿En dónde trabaja tu organización?
					</p>
				</div>
				<div className='grow hidden lg:block'/>
				<Button
					isDisabled={isLoading}
					type='submit' onPress={async () => {
						setIsLoading(true);
						const result = await action([...selectedSectorKeys]);
						setIsLoading(false);
						if (result.success) {
							add({
								title: 'Se han guardado los cambios.',
							});
							setError(undefined);
						} else {
							setError(result.message);
						}
					}}>
					{
						isLoading
							? <LoadingSpinner className='me-1'/>
							: <Save className='fill-current me-1'/>
					}
					Guardar
				</Button>
			</div>
			<div
				className='flex gap-4 h-auto flex-wrap'>
				<SectorsMap
					sectors={sectors} selectedKeys={selectedSectorKeys} setSelectedKeys={key => {
						setSelectedSectorKeys(key as Set<number>);
					}}
					className='h-[32rem] grow mb-4'/>
				<div className='h-[28rem] lg:h-[32rem] w-full lg:w-64 border border-stone-800 rounded px-2 py-3 overflow-y-scroll scroll-smooth scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thin scrollbar-thumb-stone-50'>
					<ListBox
						items={selectedSectors} label='Sectores seleccionados'>
						{
							municipality => (
								<Section items={municipality.sectors} title={municipality.name}>
									{
										sector => (
											<Item textValue={sector.name}>
												<div className='w-full flex items-center'>
													<span className='grow'>
														{sector.name}
													</span>
													<Button
														variant='text' className='enabled:hover:bg-stone-700' onPress={() => {
															setSelectedSectorKeys(previous => previous.remove(sector.id));
														}}>
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

