'use client';
import React, {useMemo, useState} from 'react';
import dynamic from 'next/dynamic';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';
import {Seq, Set} from 'immutable';
import {Item, Section, useListData} from 'react-stately';
import Save from '@material-design-icons/svg/round/save.svg';
import Remove from '@material-design-icons/svg/round/remove.svg';
import {type ServerActionResult} from '@/lib/server-action-result.ts';

import {ListBox, Button, useToasts, LoadingSpinner, Paper} from 'geostats-ui';

const SectorsMap = dynamic(
	async () => import('@/app/(logged-in)/my/sectors/sectors-map.tsx'),
	{
		ssr: false,
		loading() {
			return (
				<div className="mb-4 h-[32rem] grow animate-pulse rounded bg-stone-900" />
			);
		},
	},
);

export type SectorFormProps = {
	readonly sectors: Array<
		Sector & {
		geom: Geometry;
		municipalityName: string;
	}
	>;
	readonly organization: {
		sectors: Array<{
			id: number;
		}>;
	};
	readonly action: (sectorIds: number[]) => Promise<ServerActionResult>;
};

export default function SectorsForm(props: SectorFormProps) {
	const {sectors, organization, action} = props;

	const sectorsList = useListData({
		initialItems: sectors,
	});

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(() =>
		Set(organization.sectors.map(sector => sector.id)),
	);
	const {add} = useToasts();
	const [isLoading, setIsLoading] = useState(false);
	const selectedSectors = useMemo(
		() =>
			Seq(selectedSectorKeys)
				.map(key => sectorsList.getItem(key))
				.groupBy(sector => sector.municipalityId)
				.map((sectors, id) => ({
					name: sectors.first()!.municipalityName,
					id,
					sectors: sectors.sortBy(sector => sector.name),
				}))
				.toList()
				.sortBy(municipality => municipality.name),
		[sectorsList, selectedSectorKeys],
	);

	return (
		<div className="grow">
			<div className="mb-4 flex flex-wrap items-end gap-3">
				<div className="w-full lg:w-auto">
					<h1 className="mb-2 text-4xl text-stone-200">
						Alcance geográfico
					</h1>
					<p className="text-stone-300">
						¿En dónde trabaja tu organización?
					</p>
				</div>
				<div className="hidden grow lg:block" />
				<Button
					isDisabled={isLoading}
					className="shadow-stone-700 glow-xl"
					type="submit"
					onPress={async () => {
						setIsLoading(true);
						const result = await action([...selectedSectorKeys]);
						setIsLoading(false);
						if (result.success) {
							add({
								title: 'Se han guardado los cambios.',
							});
						}
					}}
				>
					{isLoading ? (
						<LoadingSpinner className="me-1" />
					) : (
						<Save className="me-1 fill-current" />
					)}
					Guardar
				</Button>
			</div>
			<div className="my-8 flex h-auto flex-wrap gap-4">
				<SectorsMap
					sectors={sectors}
					selectedKeys={selectedSectorKeys}
					setSelectedKeys={key => {
						setSelectedSectorKeys(key as Set<number>);
					}}
					className="h-[32rem] grow"
				/>
				<Paper
					className="h-[28rem] w-full overflow-y-scroll scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-stone-50 scrollbar-thumb-rounded lg:h-[32rem] lg:w-64">
					<ListBox
						items={selectedSectors}
						label="Sectores seleccionados"
					>
						{municipality => (
							<Section
								items={municipality.sectors}
								title={municipality.name}
							>
								{sector => (
									<Item textValue={sector.name}>
										<div className="flex w-full items-center">
											<span className="grow">
												{sector.name}
											</span>
											<Button
												variant="text"
												className="enabled:hover:bg-stone-700"
												onPress={() => {
													setSelectedSectorKeys(
														previous =>
															previous.remove(
																sector.id,
															),
													);
												}}
											>
												<Remove className="fill-current" />
											</Button>
										</div>
									</Item>
								)}
							</Section>
						)}
					</ListBox>
				</Paper>
			</div>
		</div>
	);
}
