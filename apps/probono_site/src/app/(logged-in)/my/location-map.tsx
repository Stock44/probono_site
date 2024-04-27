'use client';
import React from 'react';
import {MapContainer, Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import Location from 'public/location.png';
import GeostatsTileLayer from '@/components/geostats-tile-layer.tsx';

const locationIcon = new Icon({
	iconUrl: Location.src,
	iconSize: [Location.height / 2, Location.width / 2],
	iconAnchor: [15, 30],
});

export type LocationMapProps = {
	readonly location: [number, number];
	readonly className?: string;
};

export default function LocationMap(props: LocationMapProps) {
	const {location, className} = props;
	return (
		<MapContainer
			center={location} className={className} zoom={15}
			scrollWheelZoom={false} keyboard={false} zoomControl={false}
			attributionControl={false} dragging={false}>
			<GeostatsTileLayer/>
			<Marker position={location} icon={locationIcon}/>
		</MapContainer>
	);
}
