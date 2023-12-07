'use client';
import React, {useEffect, useRef, useState} from 'react';
import {type Map} from 'leaflet';
import {type Address, type Municipality, type Organization, type State} from '@prisma/client';
import {Item} from 'react-stately';
import {useQuery} from 'react-query';
import dynamic from 'next/dynamic';
import {useDebounce} from 'usehooks-ts';
import Save from '@material-design-icons/svg/round/save.svg';
import Done from '@material-design-icons/svg/round/done.svg';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';
import {NumberField} from '@/components/number-field.tsx';
import Form, {type FormState} from '@/components/form.tsx';
import {formValidators} from '@/lib/form-utils.ts';
import {addressInitSchema} from '@/lib/schemas/address.ts';
import {geocodeAddress, reverseGeocode} from '@/lib/mapbox.ts';
import {type OrganizationUpdate} from '@/lib/schemas/organization.ts';
import SubmitButton from '@/components/submit-button.tsx';

const AddressMap = dynamic(async () => import('@/app/(logged-in)/my/[organizationId]/location/address-map.tsx'),
	{
		ssr: false,
		loading: () => <div className='w-full h-96 bg-stone-900 animate-pulse mb-4'/>,
	});

export type AddressInfoFormProps = {
	readonly states: State[];
	readonly organization: Organization & {
		readonly address: Address & {
			readonly municipality: Municipality;
			readonly location: [number, number] | null;
		} | null;
	};
	readonly action: (state: FormState<OrganizationUpdate>, data: FormData) => Promise<FormState<OrganizationUpdate>>;
};

export default function AddressInfoForm(props: AddressInfoFormProps) {
	const {states, organization, action} = props;
	const mapRef = useRef<Map>(null);

	const [address, setAddress] = useState<{
		street: string;
		number: number;
		postalCode: string;
		stateId: number | null;
		municipalityId: number | null;
	}>({
		street: organization.address?.street ?? '',
		number: organization.address?.number ?? Number.NaN,
		postalCode: organization.address?.postalCode ?? '',
		stateId: organization.address?.municipality.stateId ?? null,
		municipalityId: organization.address?.municipalityId ?? null,
	});

	const [coords, setCoords] = useState<[number, number] | null>(organization.address?.location ?? null);

	const {data: municipalities} = useQuery<Municipality[]>(['municipalities', address.stateId], async () => {
		const response = await fetch(`/api/states/${address.stateId}/municipalities`);
		return response.json();
	}, {
		staleTime: Number.POSITIVE_INFINITY,
		enabled: address.stateId !== null,
	});

	const validate = formValidators(addressInitSchema);

	const debouncedAddress = useDebounce(address, 2000);

	useEffect(() => {
		if (
			coords !== null
				|| !municipalities
				|| debouncedAddress.street.trim() === ''
				|| debouncedAddress.postalCode.trim() === ''
				|| debouncedAddress.stateId === null
				|| debouncedAddress.municipalityId === null
				|| Number.isNaN(debouncedAddress.number)
		) {
			return;
		}

		const state = states.find(state => state.id === debouncedAddress.stateId);
		const municipality = municipalities.find(municipality => municipality.id === debouncedAddress.municipalityId);

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
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done/>,
			}}
			action={action}
			staticValues={{
				address: coords && address?.municipalityId ? {
					...address,
					municipalityId: address.municipalityId,
					location: coords,
				} : undefined,
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
				<SubmitButton icon={<Save/>}>
					Guardar
				</SubmitButton>
			</div>
			<AddressMap
				initialZoom={organization.address?.location ? 15 : 11}
				initialCoords={organization.address?.location ?? [25.68, -100.31]}
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
						municipalityId: municipality.id,
						stateId: state.id,
					});
					setCoords(address.center);
					mapRef.current?.flyTo(address.center, 15);
				}}/>
			<div className='flex w-full gap-x-4 mb-4'>
				<TextField
					isRequired
					name='streetName'
					validate={validate.street}
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
					validate={validate.number}
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
					selectedKey={address.stateId}
					onSelectionChange={selection => {
						setAddress(previous => ({
							...previous,
							stateId: selection as number,
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
					className='basis-1/2' selectedKey={address.municipalityId}
					onSelectionChange={selection => {
						setAddress(previous => ({
							...previous,
							municipalityId: selection as number,
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
