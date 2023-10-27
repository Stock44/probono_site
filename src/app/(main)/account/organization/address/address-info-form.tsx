'use client';
import React, {type Key, useMemo, useRef, useState} from 'react';
import {type Map} from 'leaflet';
import {CircleMarker, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {type State} from '@prisma/client';
import {Item, useListData, type Selection} from 'react-stately';
import {useQuery} from 'react-query';
import z from 'zod';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';
import SearchField from '@/components/search-field.tsx';
import ListBox from '@/components/list-box.tsx';

const headers = new Headers({
	'User-Agent': 'GeoStatsProbono',
});

/* eslint-disable @typescript-eslint/naming-convention */
const osmResultSchema = z.object({
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
}));

/* eslint-enable @typescript-eslint/naming-convention */
type InputOsmResult = z.input<typeof osmResultSchema>;
type OsmResult = z.infer<typeof osmResultSchema>;

export default function AddressInfoForm({states}: {readonly states: State[]}) {
	const [searchQuery, setSearchQuery] = useState<string>();

	const {items: searchResults, selectedKeys, setSelectedKeys, append, remove, getItem} = useListData<OsmResult>({});

	const mapRef = useRef<Map>(null);

	const {isLoading} = useQuery(['address_search', searchQuery], async () => {
		const parameters = new URLSearchParams({
			q: searchQuery!,
			addressdetails: '1',
			countrycodes: 'mx',
			format: 'jsonv2',
		});

		const response = await fetch('https://nominatim.openstreetmap.org/search?' + parameters.toString(), {
			method: 'GET',
			headers,
		});

		const results = await response.json() as InputOsmResult[];

		remove(...searchResults.map(result => result.id));
		append(...results.map(element => osmResultSchema.parse(element)));
	}, {
		enabled: searchQuery !== undefined,
		retry: false,
		staleTime: Number.POSITIVE_INFINITY,
	});

	if (selectedKeys !== 'all' && selectedKeys.size > 0) {
		console.log('selected');
		for (const key of selectedKeys) {
			console.log(getItem(key));
		}
	}

	const handleResultSelect = (keys: Selection) => {
		const map = mapRef.current;

		if (map !== null && keys !== 'all') {
			map.flyTo(getItem(keys.values().next().value as Key));
		}

		setSelectedKeys(keys);
	};

	const selectedResult = selectedKeys === 'all' || selectedKeys.size === 0 ? undefined : getItem(selectedKeys.values().next().value as Key);

	return (
		<form>
			<div className='flex justify-between items-end mb-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Dirección
					</h1>
					<p className='text-stone-300'>
						¿Dónde está ubicada tu organización?
					</p>
				</div>
				<Button type='submit'>
					<Icon iconName='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<SearchField label='Buscar una dirección' className='mb-4' onSubmit={setSearchQuery}/>
			{
				searchResults.length === 0
					? null
					: <ListBox items={searchResults} selectionMode='single' selectedKeys={selectedKeys} onSelectionChange={handleResultSelect}>
						{
							searchResult => (
								<Item>
									{searchResult.displayName}
								</Item>
							)
						}
					</ListBox>

			}

			<MapContainer ref={mapRef} scrollWheelZoom center={[25.68, -100.31]} zoom={11} className='h-96 rounded border border-stone-800 mb-4'>
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
			<div className='flex w-full gap-x-4'>
				<TextField isRequired label='Calle' className='grow mb-4'/>
				<TextField isRequired label='Numero exterior' className='w-32 mb-4'/>
				<TextField label='Numero interior' className='w-32 mb-4'/>
			</div>
			<div className='flex w-full gap-x-4'>
				<TextField isRequired label='Colonia' className='grow mb-4'/>
				<TextField isRequired label='Codigo postal' className='w-32 mb-4'/>
			</div>
			<TextField label='Entre calles' className='mb-4'/>
			<Select label='Estado' placeholder='Selecciona un estado' items={states} className='mb-4'>
				{
					state => (
						<Item>{state.name}</Item>
					)
				}
			</Select>
		</form>

	);
}
