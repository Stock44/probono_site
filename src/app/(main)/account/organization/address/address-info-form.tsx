'use client';
import React, {type Key, useMemo, useRef, useState} from 'react';
import {type Map} from 'leaflet';
import {type Municipality, type State} from '@prisma/client';
import {Item, type Selection, useListData} from 'react-stately';
import {useQuery} from 'react-query';
import dynamic from 'next/dynamic';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';
import SearchField from '@/components/search-field.tsx';
import ListBox from '@/components/list-box.tsx';
import {
	type InputOsmResult,
	type OsmResult,
	osmResultSchema,
} from '@/app/(main)/account/organization/address/osm-result-schema.tsx';
import {NumberField} from '@/components/number-field.tsx';
import useImmutableListData from '@/lib/hooks/use-immutable-list-data.ts';

const headers = new Headers({
	'User-Agent': 'GeoStatsProbono',
});

// Const {isLoading} = useQuery(['address_search', searchQuery], async () => {
// 	const parameters = new URLSearchParams({
// 		q: searchQuery!,
// 		addressdetails: '1',
// 		countrycodes: 'mx',
// 		format: 'jsonv2',
// 	});
//
// 	const response = await fetch('https://nominatim.openstreetmap.org/search?' + parameters.toString(), {
// 		method: 'GET',
// 		headers,
// 	});
//
// 	const results = await response.json() as InputOsmResult[];
//
// 	remove(...searchResults.map(result => result.id));
// 	append(...results.map(element => osmResultSchema.parse(element)));
// }, {
// 	enabled: searchQuery !== undefined,
// 	retry: false,
// 	staleTime: Number.POSITIVE_INFINITY,
// });

const AddressMap = dynamic(async () => import('@/app/(main)/account/organization/address/address-map.tsx'), {ssr: false});

export default function AddressInfoForm({states}: {readonly states: State[]}) {
	const mapRef = useRef<Map>(null);

	const [street, setStreet] = useState('');
	const [number, setNumber] = useState<number>();
	const [intNumber, setIntNumber] = useState<number>();
	const [selectedStateKey, setSelectedStateKey] = useState<Key>();
	const [selectedMunicipalityKey, setSelectedMunicipalityKey] = useState<Key>();

	const state = useMemo(() =>
		selectedStateKey === undefined
			? undefined
			: states.find(state => state.id === selectedStateKey,
			), [selectedStateKey, states]);

	const {data: municipalities} = useQuery<Municipality[]>(['municipalities', selectedStateKey], async () => {
		const response = await fetch(`/api/states/${selectedStateKey}/municipalities`);
		return response.json();
	}, {
		enabled: selectedStateKey !== undefined,
	});

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
			<AddressMap mapRef={mapRef}/>
			<div className='flex w-full gap-x-4'>
				<TextField isRequired label='Calle' className='grow mb-4'/>
				<NumberField
					isRequired label='Numero exterior' className='w-32 mb-4'
					formatOptions={{
						useGrouping: false,
					}}/>
				<NumberField
					label='Numero interior' className='w-32 mb-4' formatOptions={{
						useGrouping: false,
					}}/>
			</div>
			<div className='flex w-full gap-x-4 mb-4'>
				<TextField isRequired label='Colonia' className='grow'/>
				<NumberField isRequired label='Codigo postal' className='w-32'/>
			</div>
			<div className='flex mb-4 gap-x-4'>
				<Select label='Estado' placeholder='Selecciona un estado' items={states} className='basis-1/2' selectedKey={selectedStateKey} onSelectionChange={setSelectedStateKey}>
					{
						state => (
							<Item>{state.name}</Item>
						)
					}
				</Select>
				<Select isDisabled={selectedStateKey === undefined} label='Municipio' placeholder='Selecciona un municipio' items={municipalities ?? []} className='basis-1/2' selectedKey={selectedMunicipalityKey} onSelectionChange={setSelectedMunicipalityKey}>
					{municipality => (
						<Item>
							{municipality.name}
						</Item>
					)}
				</Select>
			</div>
			<Button>
				<Icon iconName='search' className='me-2'/> Buscar
			</Button>
		</form>

	);
}
