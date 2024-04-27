type Address = {
	street: string;
	number: number;
	postalCode: string;
	state: string;
	municipality: string;
};
type MapboxFeature = {
	id: string;
	type: 'Feature';
	place_type: string[];
	relevance: number;
	address?: string;
	properties: {
		accuracy: string;
	};
	text: string;
	place_name: string;
	context: Array<Partial<MapboxFeature>>;
	center: [number, number];
};
type MapboxGeocodingResult = {
	type: 'FeatureCollection';
	features: MapboxFeature[];
};
type MapboxForwardGeocodingResult = {
	query: string[];
} & MapboxGeocodingResult;
type MapboxReverseGeocodingResult = {
	query: [number, number];
} & MapboxGeocodingResult;

export async function geocodeAddress(address: Address): Promise<[number, number] | undefined> {
	const uri = `${address.number} ${address.street} ${address.municipality} ${address.state} ${address.postalCode}`;
	const parameters = new URLSearchParams([
		['access_token', process.env.NEXT_PUBLIC_MAPBOX_TOKEN!],
		['country', 'MX'],
		['language', 'es'],
		['limit', '1'],
	]);
	const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(uri)}.json?${parameters.toString()}`);

	const data = await response.json() as MapboxForwardGeocodingResult;

	console.log(data);

	if (data.features.length === 0) {
		return;
	}

	const {center} = data.features[0];

	return [center[1], center[0]];
}

export async function reverseGeocode(coords: [number, number]) {
	const parameters = new URLSearchParams([
		['access_token', process.env.NEXT_PUBLIC_MAPBOX_TOKEN!],
		['country', 'MX'],
		['language', 'es'],
		['limit', '1'],
		['types', 'address'],
	]);
	const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[1]},${coords[0]}.json?${parameters.toString()}`);

	const data = await response.json() as MapboxReverseGeocodingResult;

	if (data.features.length === 0) {
		return;
	}

	const feature = data.features[0];

	return {
		street: feature.text,
		number: feature.address ? Number.parseInt(feature.address, 10) : 0,
		postalCode: feature.context[0].text ?? '',
		municipality: feature.context[1].text ?? '',
		state: feature.context[2].text ?? '',
		center: [feature.center[1], feature.center[0]] as [number, number],
	};
}
