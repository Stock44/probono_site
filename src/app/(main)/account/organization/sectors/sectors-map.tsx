import {GeoJSON, MapContainer, TileLayer, Tooltip, useMapEvent} from 'react-leaflet';
import React, {type Key, useEffect, useState} from 'react';
import {Set} from 'immutable';
import {useQuery} from 'react-query';
import {type Geometry} from 'geojson';
import {type Sector} from '@prisma/client';

type SectorProps = {
	readonly isSelected: boolean;
	readonly onIsSelectedChange: (isSelected: boolean) => void;
	readonly sector: Sector & {geom: Geometry};
};

function SectorDisplay(props: SectorProps) {
	const {isSelected, sector, onIsSelectedChange} = props;

	return (
		<GeoJSON
			key={sector.id}
			data={sector.geom}
			eventHandlers={{
				click() {
					onIsSelectedChange(!isSelected);
				},
			}}
			style={{
				fill: true,
				fillColor: isSelected ? '#ffffff' : '#a3a3a3',
				fillOpacity: isSelected ? 0.5 : 0.1,
				stroke: true,
				weight: 1,
				color: '#fafaf9',
			}}>
			<Tooltip>
				{sector.name}
			</Tooltip>
		</GeoJSON>
	);
}

export default function SectorsMap() {
	const {data} = useQuery('sectors', async () => {
		const response = await fetch('/api/sectors');
		return (await response.json()) as Array<Sector & {geom: Geometry}>;
	}, {
		staleTime: Number.POSITIVE_INFINITY,
	});

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(Set<Key>());

	console.log(selectedSectorKeys);

	return (
		<MapContainer scrollWheelZoom center={[25.68, -100.31]} zoom={11} className='h-screen rounded border border-stone-800 mb-4'>

			<TileLayer
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
				url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
			/>
			{
				data === undefined
					? null
					: data.map(sector => (
						<SectorDisplay
							key={sector.id}
							sector={sector} isSelected={selectedSectorKeys.has(sector.id)} onIsSelectedChange={isSelected => {
								console.log(isSelected);
								if (isSelected) {
									setSelectedSectorKeys(selectedSectorKeys.add(sector.id));
								} else {
									setSelectedSectorKeys(selectedSectorKeys.remove(sector.id));
								}
							}}/>
					))
			}

		</MapContainer>
	);
}
