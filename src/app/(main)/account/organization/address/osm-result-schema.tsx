/* eslint-disable @typescript-eslint/naming-convention */
import z from 'zod';

export const osmResultSchema = z.object({
	osm_id: z.number(),
	display_name: z.string(),
	lat: z.coerce.number(),
	lon: z.coerce.number(),
	address: z.object({
		road: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		postcode: z.string().optional(),
		country: z.string().optional(),
		country_code: z.string().optional(),
	}),
}).transform(({osm_id, display_name, lat, lon, address,
}) => ({
	id: osm_id,
	displayName: display_name,
	lat,
	lng: lon,
	...address,
	countryCode: address.country_code,
}));
/* eslint-enable @typescript-eslint/naming-convention */
export type InputOsmResult = z.input<typeof osmResultSchema>;
export type OsmResult = z.infer<typeof osmResultSchema>;
