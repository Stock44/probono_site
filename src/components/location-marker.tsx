'use client';

import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import Location from 'public/location.png';

const locationIcon = new Icon({
	iconUrl: Location.src,
	iconSize: [Location.height / 2, Location.width / 2],
	iconAnchor: [15, 30],
});

export type LocationMarkerProps = {
	readonly position: [number, number];
};

export default function LocationMarker(props: LocationMarkerProps) {
	const {position} = props;
	return <Marker position={position} icon={locationIcon}/>;
}
