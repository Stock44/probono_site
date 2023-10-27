'use client';
import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {type State} from '@prisma/client';
import {Item} from 'react-stately';
import {LabeledInput} from '@/components/labeled-input.tsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Select from '@/components/select.tsx';
import TextField from '@/components/text-field.tsx';

export default function AddressInfoForm({states}: {readonly states: State[]}) {
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
			<MapContainer scrollWheelZoom center={[25.68, -100.31]} zoom={11} className='h-96 rounded border border-stone-800 mb-4'>
				<TileLayer
					attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
					url='https://api.maptiler.com/maps/backdrop-dark/{z}/{x}/{y}.png?key=9R74rUQCdAWUOY0Tf0Xp'
				/>
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
