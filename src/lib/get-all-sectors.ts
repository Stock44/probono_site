import {cache} from 'react';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';
import prisma from '@/lib/prisma.ts';

export default cache(async () => {
	const sectors: Array<Sector & {geom: Geometry}> = await prisma.$queryRaw`select s.id, s.name, s."municipalityId", ST_AsGeoJSON(ST_Transform(s.geom, 4326))::jsonb as geom from "Sector" as s`;
	return sectors;
});
