import {TileLayer} from 'react-leaflet';
import React from 'react';

export default function GeostatsTileLayer() {
	return (
		<TileLayer
			attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
			url={`https://api.mapbox.com/styles/v1/stock44/clp78x4lm013d01ns32akem9o/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
		/>
	);
}
