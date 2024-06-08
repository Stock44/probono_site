'use client';

import React from 'react';
import {MapContainer} from 'react-leaflet';

import LocationMarker from '@/components/location-marker.tsx';

import {GeostatsTileLayer} from 'geostats-ui';

export type LocationMapProps = {
	readonly organizations: Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;
	readonly className?: string;
};

export default function LocationMap(props: LocationMapProps) {
	const {organizations, className} = props;
	return (
		<MapContainer center={[25.68, -100.31]} className={className} zoom={12}>
			{organizations.map(organization => (
				<LocationMarker
					key={organization.id}
					position={organization.location}
					popup={organization.name}
				/>
			))}
			<GeostatsTileLayer />
		</MapContainer>
	);
}
