'use client';
import React, {useState} from 'react';
import {CluniStatus, type CorporationType, DonationAuthStatus} from '@prisma/client';
import {Item} from 'react-stately';
import {LabeledInput} from '@/components/labeled-input.tsx';
import Select from '@/components/select.tsx';
import {NumberField} from '@/components/number-field.tsx';
import LabeledCheckbox from '@/components/labeled-checkbox.tsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Checkbox from '@/components/checkbox.tsx';
import TextField from '@/components/text-field.tsx';

const clunis = [
	{
		key: CluniStatus.no,
		label: 'No contamos con CLUNI',
	},
	{
		key: CluniStatus.inProgress,
		label: 'Trámite en proceso',
	},
	{
		key: CluniStatus.inactive,
		label: 'Contamos con CLUNI, actualmente inactiva',
	},
	{
		key: CluniStatus.active,
		label: 'Contamos con CLUNI activa',
	},
];

const donationStatuses = [
	{
		key: DonationAuthStatus.notAuthorized,
		label: 'No contamos con donataria autorizada',
	},
	{
		key: DonationAuthStatus.authorized,
		label: 'Sí contamos con donataria autorizada',
	},
	{
		key: DonationAuthStatus.inProgress,
		label: 'En proceso de autorización',
	},
	{
		key: DonationAuthStatus.inRecovery,
		label: 'En proceso de recuperación',
	},
];

export default function LegalInfoForm({corporationTypes}: {readonly corporationTypes: CorporationType[]}) {
	const [enabled, setEnabled] = useState(false);
	return (
		<form>
			<div className='flex justify-between items-end mb-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Datos legales
					</h1>
					<p className='text-stone-300'>
						Aquí va la información legal de tu organización.
					</p>
				</div>
				<Button type='submit'>
					<Icon iconName='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<Checkbox
				className='mb-4'
				isSelected={enabled} onChange={isSelected => {
					setEnabled(isSelected);
				}}>
				La organización esta incorporada legalmente.
			</Checkbox>
			<div className='flex gap-2'>
				<TextField
					isRequired
					isDisabled={!enabled}
					label='Razón social'
					className='grow basis-9/12 mb-4'
				/>
				<Select
					isRequired
					placeholder='Tipo'
					isDisabled={!enabled}
					label='Tipo'
					className='basis-2/12 mb-4'
					items={corporationTypes}>
					{
						corporationType => (
							<Item>
								{corporationType.shortName ?? corporationType.name}
							</Item>
						)
					}
				</Select>
			</div>

			<div className='flex gap-2 mb-4'>
				<TextField label='RFC' isDisabled={!enabled} className='grow basis-8/12'/>
				<NumberField
					isRequired
					isDisabled={!enabled}
					label='Año de incorporación'
					defaultValue={2023}
					className='basis-3/12'
				/>

			</div>
			<div className='flex gap-2'>
				<Select
					label='Estatus de CLUNI'
					isDisabled={!enabled}
					className='grow basis-full sm:basis-5/12'
					placeholder='Selecciona un valor'
					items={clunis}
				>
					{
						cluni => (
							<Item>
								{cluni.label}
							</Item>
						)
					}
				</Select>
				<Select
					label='Estatus de donataria autorizada'
					className='grow basis-full sm:basis-5/12 mb-4'
					isDisabled={!enabled}
					placeholder='Selecciona un valor'
					items={donationStatuses}
				>
					{
						donationStatus => (
							<Item>
								{donationStatus.label}
							</Item>
						)
					}
				</Select>
			</div>

		</form>
	);
}
