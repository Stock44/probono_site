import {GeoJSON, MapContainer, TileLayer, Tooltip, useMapEvent} from 'react-leaflet';
import React, {type Key, useEffect, useMemo, useState} from 'react';
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
				fillColor: isSelected ? '#fafaf9' : '#a8a29e',
				fillOpacity: isSelected ? 0.5 : 0.1,
				stroke: true,
				weight: 1,
				color: '#78716c',
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

	const time = useMemo(() => Date.now(), []);

	return (
		<MapContainer key={time} scrollWheelZoom worldCopyJump center={[25.68, -100.31]} zoom={11} className={cx('rounded border border-stone-800', className)}>

			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url={`https://api.mapbox.com/styles/v1/stock44/clp78x4lm013d01ns32akem9o/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
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
