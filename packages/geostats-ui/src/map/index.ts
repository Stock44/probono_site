import dynamic from 'next/dynamic';

export const GeostatsTileLayer = dynamic(
	() => import('./geostats-tile-layer.tsx'),
	{
		ssr: false,
	},
);
