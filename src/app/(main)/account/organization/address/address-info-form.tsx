'use client';
import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {type State} from '@prisma/client';
import {LabeledInput} from '@/components/labeled-input.tsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import {Select} from '@/components/select.tsx';

export default function AddressInfoForm({states}: {readonly states: State[]}) {
	return (
		<form>
			<MapContainer scrollWheelZoom center={[25.68, -100.31]} zoom={11} className='h-96 rounded border border-stone-800 mb-4'>
				<TileLayer
					attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
					url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
				/>
			</MapContainer>
			<div className='flex w-full gap-x-4'>
				<LabeledInput required label='Calle' className='grow'/>
				<LabeledInput required label='Numero exterior' className='w-32'/>
				<LabeledInput label='Numero interior' className='w-32'/>
			</div>
			<div className='flex w-full gap-x-4'>
				<LabeledInput required label='Colonia' className='grow'/>
				<LabeledInput required label='Codigo postal' className='w-32'/>
			</div>
			<LabeledInput label='Entre calles'/>
			<Select label='Estado' placeholder='Selecciona un estado' values={states.map(state => state.id)} labels={states.map(state => state.name)}/>
			<Button className='w-24 justify-center'><Icon iconName='save' className='me-2'/>Guardar</Button>
		</form>

	);
}
