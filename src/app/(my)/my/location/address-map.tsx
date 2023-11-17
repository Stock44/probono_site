import React, {type ForwardedRef, useMemo} from 'react';
import {type Map, Icon} from 'leaflet';
import {CircleMarker, MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';

type AddressMapProps = {
	readonly selectedCoords?: [number, number];
	readonly mapRef: ForwardedRef<Map>;
};

const locationIcon = new Icon({
	iconUrl: '/location.png',
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});

export default function AddressMap(props: AddressMapProps) {
	const {selectedCoords, mapRef} = props;
	// Required in order to fix an error with Map recreation
	const time = useMemo(() => Date.now(), []);

	return (
		<MapContainer key={time} ref={mapRef} scrollWheelZoom={false} zoomControl={false} dragging={false} center={[25.68, -100.31]} zoom={11} className='h-96 rounded border border-stone-800 mb-4'>
			<TileLayer
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> | <a target="_blank" href="https://icons8.com/icon/3723/location">Location</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
				url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
			/>
			{
				selectedCoords === undefined
					? null
					: <Marker position={selectedCoords} icon={locationIcon}/>
			}
		</MapContainer>
	);
}
