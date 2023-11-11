import {useQuery} from 'react-query';
import z from 'zod';

/* eslint-disable @typescript-eslint/naming-convention */
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
		house_number: z.coerce.number().optional(),
	}),
}).transform(({
	osm_id,
	display_name,
	lat,
	lon,
	address,
}) => ({
	id: osm_id,
	displayName: display_name,
	lat,
	lng: lon,
	...address,
	countryCode: address.country_code,
	number: address.house_number,
}));
/* eslint-enable @typescript-eslint/naming-convention */

export type InputOsmResult = z.input<typeof osmResultSchema>;
export type OsmResult = z.infer<typeof osmResultSchema>;

const headers = new Headers({
	'User-Agent': 'GeoStatsProbono',
});

export type AddressQuery = {
	street: string;
	number: number;
	state?: string;
	municipality?: string;
	postalCode?: number;
};

export function useNominatimSearch(query?: AddressQuery) {
	const {data: searchResult} = useQuery<OsmResult | undefined>(['nominatim_search', query], async () => {
		const parameters = new URLSearchParams({
			countrycodes: 'mx',
			addressdetails: '1',
			limit: '1',
			layer: 'address',
			format: 'jsonv2',
			zoom: '18',
		});

		let fullStreet = query!.street ?? '';

		if (!Number.isNaN(query!.number)) {
			fullStreet = query!.number.toString() + ', ' + fullStreet;
		}

		parameters.append('street', fullStreet);

		if (query!.municipality !== undefined) {
			parameters.append('county', query!.municipality);
		}

		if (query!.state !== undefined) {
			parameters.append('state', query!.state);
		}

		if (query!.postalCode !== undefined && !Number.isNaN(query!.postalCode)) {
			parameters.append('postalcode', query!.postalCode.toString());
		}

		const response = await fetch('https://nominatim.openstreetmap.org/search?' + parameters.toString(), {
			method: 'GET',
			headers,
		});

		const result = await response.json() as InputOsmResult[];
		if (result.length === 0) {
			return undefined;
		}

		return osmResultSchema.parse(result[0]);
	}, {
		staleTime: Number.POSITIVE_INFINITY,
		enabled: query !== undefined,
	});

	return {
		searchResult,
	};
}
