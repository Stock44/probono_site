'use client';
import React, {type Key, useEffect, useMemo, useRef, useState} from 'react';
import {type LeafletMouseEvent, type Map} from 'leaflet';
import {type Municipality, type State} from '@prisma/client';
import {Item} from 'react-stately';
import {useQuery} from 'react-query';
import dynamic from 'next/dynamic';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';
import {type InputOsmResult, osmResultSchema} from '@/app/(main)/account/organization/address/osm-result-schema.tsx';
import {NumberField} from '@/components/number-field.tsx';

const headers = new Headers({
	'User-Agent': 'GeoStatsProbono',
});

const AddressMap = dynamic(async () => import('@/app/(main)/account/organization/address/address-map.tsx'), {ssr: false});

export default function AddressInfoForm({states}: {readonly states: State[]}) {
	const mapRef = useRef<Map>(null);
	const [searchQuery, setSearchQuery] = useState<string>();

	const [coords, setCoords] = useState<[number, number]>();

	const handleMapClick = (event: LeafletMouseEvent) => {
		const coords: [number, number] = [event.latlng.lat, event.latlng.lng];
		setCoords(coords);
		setSearchQuery(undefined);
		console.log('click');
	};

	const {data: searchResult} = useQuery(['nominatim_search', searchQuery], async () => {
		const response = await fetch('https://nominatim.openstreetmap.org/search?' + searchQuery, {
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
		enabled: searchQuery !== undefined,
	});

	useEffect(() => {
		if (searchResult !== undefined) {
			setCoords([searchResult.lat, searchResult.lng]);
		}
	}, [searchResult]);

	useEffect(() => {
		if (mapRef.current !== null && coords !== undefined) {
			mapRef.current.flyTo(coords, 15);
		}
	}, [coords]);

	const [street, setStreet] = useState('');
	const [number, setNumber] = useState<number>(Number.NaN);
	const [selectedStateKey, setSelectedStateKey] = useState<Key>('');
	const [selectedMunicipalityKey, setSelectedMunicipalityKey] = useState<Key>('');
	const [postalCode, setPostalCode] = useState<number>(Number.NaN);

	const {data: municipalities} = useQuery<Municipality[]>(['municipalities', selectedStateKey], async () => {
		const response = await fetch(`/api/states/${selectedStateKey}/municipalities`);
		return response.json();
	}, {
		enabled: selectedStateKey !== '',
	});

	const municipality = useMemo(() =>
		selectedMunicipalityKey === undefined || municipalities === undefined
			? undefined
			: municipalities.find(municipality => municipality.id === selectedMunicipalityKey,
			), [selectedMunicipalityKey, municipalities]);

	const state = useMemo(() =>
		selectedStateKey === undefined
			? undefined
			: states.find(state => state.id === selectedStateKey,
			), [selectedStateKey, states]);

	const submitSearchHandler = () => {
		const parameters = new URLSearchParams({
			countrycodes: 'mx',
			addressdetails: '1',
			limit: '1',
			layer: 'address',
			format: 'jsonv2',
			zoom: '18',
		});

		let fullStreet = street;

		if (!Number.isNaN(number)) {
			fullStreet = number.toString() + ', ' + fullStreet;
		}

		parameters.append('street', fullStreet);

		if (municipality !== undefined) {
			parameters.append('county', municipality.name);
		}

		if (state !== undefined) {
			parameters.append('state', state.name);
		}

		if (!Number.isNaN(postalCode)) {
			parameters.append('postalcode', postalCode.toString());
		}

		setSearchQuery(parameters.toString());
	};

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
			<AddressMap mapRef={mapRef} selectedCoords={coords}/>
			<div className='flex w-full gap-x-4 mb-4'>
				<TextField isRequired label='Calle' className='grow' value={street} onChange={setStreet}/>
				<NumberField
					isRequired label='Número' className='w-32'
					value={number} formatOptions={{
						useGrouping: false,
					}}
					onChange={setNumber}/>
				<NumberField isRequired label='Codigo postal' className='w-32' value={postalCode} onChange={setPostalCode}/>
			</div>
			<div className='flex mb-4 gap-x-4'>
				<Select
					label='Estado' placeholder='Selecciona un estado' items={states}
					className='basis-1/2'
					selectedKey={selectedStateKey} onSelectionChange={setSelectedStateKey}>
					{
						state => (
							<Item>{state.name}</Item>
						)
					}
				</Select>
				<Select
					isRequired
					isDisabled={selectedStateKey === undefined} label='Municipio' placeholder='Selecciona un municipio'
					items={municipalities ?? []} className='basis-1/2' selectedKey={selectedMunicipalityKey}
					onSelectionChange={setSelectedMunicipalityKey}>
					{municipality => (
						<Item>
							{municipality.name}
						</Item>
					)}
				</Select>
			</div>
			<Button onPress={submitSearchHandler}>
				<Icon iconName='search' className='me-2'/> Buscar
			</Button>
		</form>

	);
}
