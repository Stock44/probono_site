import React, {type ForwardedRef, useMemo} from 'react';
import {type Map} from 'leaflet';
import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import LocationMarker from '@/components/location-marker.tsx';

type AddressMapProps = {
	readonly selectedCoords: [number, number] | null;
	readonly mapRef: ForwardedRef<Map>;
	readonly onClick?: (latLng: [number, number]) => void;
	readonly initialCoords?: [number, number];
	readonly initialZoom?: number;
};

type ClickListenerProps = {
	readonly onClick: (latLng: [number, number]) => void;
};

function ClickListener(props: ClickListenerProps) {
	useMapEvents({
		click(event) {
			props.onClick([event.latlng.lat, event.latlng.lng]);
		},
	});
	return null;
}

export default function AddressMap(props: AddressMapProps) {
	const {selectedCoords, mapRef, onClick, initialCoords, initialZoom} = props;
	// Required in order to fix an error with Map recreation
	const time = useMemo(() => Date.now(), []);

	return (
		<MapContainer key={time} ref={mapRef} center={initialCoords} zoom={initialZoom} className='h-96 rounded border border-stone-800 my-8 glow-2xl'>
			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url={`https://api.mapbox.com/styles/v1/stock44/clp78x4lm013d01ns32akem9o/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
			/>
			{selectedCoords && <LocationMarker position={selectedCoords}/>}
			{
				onClick
					&& <ClickListener onClick={onClick}/>
			}
		</MapContainer>
	);
}
