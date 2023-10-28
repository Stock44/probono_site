'use client';
import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import dynamic from 'next/dynamic';

const SectorsMap = dynamic(async () => import('@/app/(main)/account/organization/sectors/sectors-map.tsx'), {ssr: false});

export default function SectorsForm() {
	return (
		<div>
			<SectorsMap/>
		</div>
	);
}

