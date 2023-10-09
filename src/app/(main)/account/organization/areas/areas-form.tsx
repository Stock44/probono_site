'use client';
import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

export default function AreasForm() {
	return (
		<div>
			<MapContainer scrollWheelZoom center={[25.68, -100.31]} zoom={11} className='h-96 rounded border border-stone-800 mb-4'>
				<TileLayer
					attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
					url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
				/>
			</MapContainer>
		</div>
	);
}

