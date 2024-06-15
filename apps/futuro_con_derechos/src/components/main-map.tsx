'use client';
import MapboxGl, {Map} from 'mapbox-gl';
import {useEffect, useRef, useState} from 'react';

MapboxGl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export type MainMapProps = {
	readonly className?: string;
};

const monterreyLat = 25.67;
const monterreyLng = -100.32;

export default function MainMap(props: MainMapProps) {
	const {className} = props;

	const mapRef = useRef<Map>();
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const [lng, setLng] = useState(monterreyLng);
	const [lat, setLat] = useState(monterreyLat);
	const [zoom, setZoom] = useState(10.5);

	useEffect(() => {
		if (mapRef.current || !mapContainerRef.current) {
			return;
		}

		mapRef.current = new Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/stock44/clsjyfojm03sg01nlfn4w3ohg/draft',
			center: [lng, lat],
			maxBounds: [
				[monterreyLng - 2, monterreyLat - 3],
				[monterreyLng + 2, monterreyLat + 3],
			],
			zoom: zoom,
		});
	});

	return <div ref={mapContainerRef} className={className}></div>;
}
