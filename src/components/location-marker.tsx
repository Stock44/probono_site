'use client';

import React, {type ReactNode} from 'react';
import {Marker, Tooltip} from 'react-leaflet';
import {Icon} from 'leaflet';
import Location from 'public/location.png';

const locationIcon = new Icon({
	iconUrl: Location.src,
	iconSize: [Location.height / 2, Location.width / 2],
	iconAnchor: [15, 30],
});

export type LocationMarkerProps = {
	readonly position: [number, number];
	readonly popup?: ReactNode;
};

export default function LocationMarker(props: LocationMarkerProps) {
	const {position, popup} = props;
	return (
		<Marker
			position={position} icon={locationIcon}
			eventHandlers={{
				// Mouseover(event) {
				// 	event.target.openPopup();
				// },
				// mouseout(event) {
				// 	event.target.closePopup();
				// },
			}}
		>
			{
				popup && (
					<Tooltip offset={[-2, -28]} direction='top'>{popup}</Tooltip>
				)
			}
		</Marker>
	);
}
