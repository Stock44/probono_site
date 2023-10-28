import React, {type ForwardedRef, useMemo} from 'react';
import {type Map} from 'leaflet';
import {CircleMarker, MapContainer, Popup, TileLayer} from 'react-leaflet';
import {type OsmResult} from '@/app/(main)/account/organization/address/osm-result-schema.tsx';

type AddressMapProps = {
	readonly selectedResult?: OsmResult;
	readonly mapRef: ForwardedRef<Map>;
};

export default function AddressMap(props: AddressMapProps) {
	const {selectedResult, mapRef} = props;
	// Required in order to fix an error with Map recreation
	const time = useMemo(() => Date.now(), []);

	return (
		<MapContainer key={time} ref={mapRef} scrollWheelZoom center={[25.68, -100.31]} zoom={11} className='h-96 rounded border border-stone-800 mb-4'>
			<TileLayer
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
				url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
			/>
			{
				selectedResult === undefined
					? null
					: <CircleMarker center={selectedResult}>
						<Popup>
							A pretty CSS3 popup. <br/> Easily customizable.
						</Popup>
					</CircleMarker>
			}
		</MapContainer>
	);
}
