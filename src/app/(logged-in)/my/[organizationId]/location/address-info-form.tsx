'use client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {type Map} from 'leaflet';
import {type Municipality, type Organization, type State} from '@prisma/client';
import {Item, type Key, useListData} from 'react-stately';
import {useQuery} from 'react-query';
import dynamic from 'next/dynamic';
import {useDebounce} from 'usehooks-ts';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';
import {NumberField} from '@/components/number-field.tsx';
import Form, {type FormState} from '@/components/form.tsx';
import {formValidators} from '@/lib/form-utils.ts';
import {upsertOrganizationAddress} from '@/lib/actions/address.ts';
import {type AddressInit, addressInitSchema} from '@/lib/schemas/address.ts';
import {geocodeAddress, reverseGeocode} from '@/lib/mapbox.ts';

const AddressMap = dynamic(async () => import('@/app/(logged-in)/my/[organizationId]/location/address-map.tsx'),
	{
		ssr: false,
		loading: props => <div className='w-full h-96 bg-stone-900 animate-pulse'/>,
	});

export type AddressInfoFormProps = {
	readonly states: State[];
	readonly organization: Organization;
};

export default function AddressInfoForm(props: AddressInfoFormProps) {
	const {states, organization} = props;
	const mapRef = useRef<Map>(null);

	const [address, setAddress] = useState<{
		street: string;
		number: number;
		postalCode: string;
		selectedState: Key | null;
		selectedMunicipality: Key | null;
	}>({
		street: '',
		number: Number.NaN,
		postalCode: '',
		selectedState: null,
		selectedMunicipality: null,
	});

	const [coords, setCoords] = useState<[number, number] | null>(null);

	const {data: municipalities} = useQuery<Municipality[]>(['municipalities', address.selectedState], async () => {
		const response = await fetch(`/api/states/${address.selectedState}/municipalities`);
		return response.json();
	}, {
		staleTime: Number.POSITIVE_INFINITY,
		enabled: address.selectedState !== null,
	});

	const validate = formValidators(addressInitSchema);

	const debouncedAddress = useDebounce(address, 2000);

	useEffect(() => {
		if (
			coords !== null
				|| !municipalities
				|| debouncedAddress.street.trim() === ''
				|| debouncedAddress.postalCode.trim() === ''
				|| debouncedAddress.selectedState === null
				|| debouncedAddress.selectedMunicipality === null
				|| Number.isNaN(debouncedAddress.number)
		) {
			return;
		}

		console.log('geocoding');

		console.log(debouncedAddress);

		const state = states.find(state => state.id === debouncedAddress.selectedState);
		const municipality = municipalities.find(municipality => municipality.id === debouncedAddress.selectedMunicipality);

		if (!state || !municipality) {
			return;
		}

		void geocodeAddress({
			...debouncedAddress,
			state: state.name,
			municipality: municipality.name,
		}).then(coordinates => {
			if (!coordinates) {
				return;
			}

			setCoords(coordinates);
			mapRef.current?.flyTo(coordinates, 15);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedAddress, municipalities, states]);

	return (
		<Form
			action={upsertOrganizationAddress}
			id={organization.id}
			staticValues={{
				location: coords ?? undefined,
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
					<Icon name='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<AddressMap
				mapRef={mapRef} selectedCoords={coords} onClick={async latlng => {
					const address = await reverseGeocode(latlng);
					if (!address) {
						return;
					}

					const state = states.find(state => state.name === address.state);
					const response = await fetch(`/api/municipalities/search?name=${address.municipality}`);

					if (response.status === 404) {
						return;
					}

					const municipality = await response.json() as Municipality;

					if (!state || !municipality) {
						return;
					}

					console.log(municipality);

					setAddress({
						...address,
						selectedMunicipality: municipality.id,
						selectedState: state.id,
					});
					setCoords(address.center);
					mapRef.current?.flyTo(address.center, 15);
				}}/>
			<div className='flex w-full gap-x-4 mb-4'>
				<TextField
					isRequired
					name='streetName'
					validate={validate.streetName}
					label='Calle'
					className='grow'
					value={address.street}
					onChange={value => {
						setAddress(previous => ({
							...previous,
							street: value,
						}));

						setCoords(null);
					}}
				/>
				<NumberField
					isRequired
					label='Número' className='w-32'
					name='extNumber'
					validate={validate.extNumber}
					value={address.number}
					formatOptions={{
						useGrouping: false,
					}}
					onChange={value => {
						setAddress(previous => ({
							...previous,
							number: value,
						}));

						setCoords(null);
					}}
				/>
				<TextField
					isRequired
					label='Codigo postal'
					name='postalCode'
					className='w-32'
					value={address.postalCode}
					onChange={value => {
						setAddress(previous => ({
							...previous,
							postalCode: value,
						}));

						setCoords(null);
					}}
				/>
			</div>
			<div className='flex mb-4 gap-x-4'>
				<Select
					isRequired
					label='Estado' placeholder='Selecciona un estado' items={states}
					className='basis-1/2'
					selectedKey={address.selectedState}
					onSelectionChange={selection => {
						setAddress(previous => ({
							...previous,
							selectedState: selection,
						}));
						setCoords(null);
					}}
				>
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
					isDisabled={municipalities === undefined}
					label='Municipio' placeholder='Selecciona un municipio' items={municipalities ?? []}
					className='basis-1/2' selectedKey={address.selectedMunicipality}
					onSelectionChange={selection => {
						setAddress(previous => ({
							...previous,
							selectedMunicipality: selection,
						}));
						setCoords(null);
					}}>
					{municipality => (
						<Item>
							{municipality.name}
						</Item>
					)}
				</Select>
			</div>
		</Form>

	);
}
