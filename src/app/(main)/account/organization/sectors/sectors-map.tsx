import {GeoJSON, MapContainer, TileLayer, Tooltip, useMapEvent} from 'react-leaflet';
import React, {type Key, useEffect, useState} from 'react';
import {type Set} from 'immutable';
import {type Geometry} from 'geojson';
import {type Sector} from '@prisma/client';
import {cx} from '@/lib/cva.ts';

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

export type SectorsMapProps = {
	readonly sectors: Array<Sector & {geom: Geometry}>;
	readonly selectedKeys: Set<Key>;
	readonly setSelectedKeys: (keys: Set<Key>) => void;
	readonly className?: string;
};

export default function SectorsMap(props: SectorsMapProps) {
	const {sectors, selectedKeys, setSelectedKeys, className} = props;

	return (
		<MapContainer scrollWheelZoom worldCopyJump center={[25.68, -100.31]} zoom={11} className={cx('rounded border border-stone-800', className)}>

			<TileLayer
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
				url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
			/>
			{
				sectors.map(sector => (
					<SectorDisplay
						key={sector.id}
						sector={sector} isSelected={selectedKeys.has(sector.id)} onIsSelectedChange={isSelected => {
							if (isSelected) {
								setSelectedKeys(selectedKeys.add(sector.id));
							} else {
								setSelectedKeys(selectedKeys.remove(sector.id));
							}
						}}/>
				))
			}

		</MapContainer>
	);
}
