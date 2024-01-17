import {cache} from 'react';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';
import prisma from '@/lib/prisma.ts';

export const getAllSectors = cache(async () => {
	const sectors: Array<Sector & {geom: Geometry; municipalityName: string}> = await prisma.$queryRaw`select s.id,
                                                                                  s.name,
                                                                                  s."municipalityId",
                                                                                  m."name"                                        as "municipalityName",
                                                                                  ST_AsGeoJSON(ST_Transform(s.geom, 4326))::jsonb as geom
                                                                           from "Sector" as s
                                                                                    join "Municipality" as m on m.id = s."municipalityId"`;
	return sectors;
});
