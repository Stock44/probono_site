'use client';
import React, {useEffect, useRef, useState} from 'react';
import {type Map} from 'leaflet';
import {type Municipality, type Organization, type State} from '@prisma/client';
import {Item, type Key} from 'react-stately';
import {useQuery} from 'react-query';
import dynamic from 'next/dynamic';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';
import {NumberField} from '@/components/number-field.tsx';
import Form from '@/components/form.tsx';
import {type AddressQuery, useNominatimSearch} from '@/lib/hooks/use-nominatim-search.ts';
import {formValidators} from '@/lib/schemas/form-utils.ts';
import {upsertOrganizationAddress} from '@/lib/actions/address.ts';
import {organizationAddressSchema} from '@/lib/schemas/address.ts';

const AddressMap = dynamic(async () => import('@/app/(main)/account/organization/address/address-map.tsx'), {ssr: false});

export type AddressInfoFormProps = {
	readonly states: State[];
	readonly organization: Organization;
};

export default function AddressInfoForm(props: AddressInfoFormProps) {
	const {states, organization} = props;
	const mapRef = useRef<Map>(null);
	const [searchQuery, setSearchQuery] = useState<AddressQuery>();
	const {searchResult} = useNominatimSearch(searchQuery);

	const [coords, setCoords] = useState<[number, number]>();

	useEffect(() => {
		if (searchResult !== undefined) {
			const newCoords = [searchResult.lat, searchResult.lng] as [number, number];
			setCoords(newCoords);

			if (mapRef.current !== null) {
				mapRef.current.flyTo(newCoords, 15);
			}
		}
	}, [searchResult]);

	const [street, setStreet] = useState('');
	const [number, setNumber] = useState<number>(Number.NaN);
	const [selectedStateKey, setSelectedStateKey] = useState<Key | null>(null);
	const [selectedMunicipalityKey, setSelectedMunicipalityKey] = useState<Key | null>(null);
	const [postalCode, setPostalCode] = useState<number>(Number.NaN);

	const {data: municipalities} = useQuery<Municipality[]>(['municipalities', selectedStateKey], async () => {
		const response = await fetch(`/api/states/${selectedStateKey}/municipalities`);
		return response.json();
	}, {
		staleTime: Number.POSITIVE_INFINITY,
		enabled: selectedStateKey !== null,
	});

	const submitSearchHandler = () => {
		const state = states.find(state => state.id === selectedStateKey);
		const municipality = municipalities?.find(municipality => municipality.id === selectedMunicipalityKey);
		setSearchQuery({
			street,
			number,
			postalCode,
			municipality: municipality?.name,
			state: state?.name,
		});
	};

	const validate = formValidators(organizationAddressSchema);

	return (
		<Form
			action={upsertOrganizationAddress} staticValues={{
				organizationId: organization.id,
				location: coords === undefined ? undefined : JSON.stringify(coords),
			}}>
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
				<TextField
					isRequired
					name='streetName'
					validate={validate.streetName}
					label='Calle'
					className='grow'
					value={street}
					onChange={setStreet}
				/>
				<NumberField
					isRequired
					label='Número' className='w-32'
					name='extNumber'
					validate={validate.extNumber}
					value={number} formatOptions={{
						useGrouping: false,
					}}
					onChange={setNumber}/>
				<NumberField
					isRequired
					label='Codigo postal'
					className='w-32'
					value={postalCode}
					onChange={setPostalCode}
				/>
			</div>
			<div className='flex mb-4 gap-x-4'>
				<Select
					isRequired
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
					name='municipalityId'
					validate={validate.municipalityId}
					isDisabled={municipalities === undefined} label='Municipio' placeholder='Selecciona un municipio'
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
		</Form>

	);
}
