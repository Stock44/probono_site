'use client';
import React, {useState} from 'react';
import {CluniStatus, type CorporationType, DonationAuthStatus} from '@prisma/client';
import {LabeledInput} from '@/components/labeled-input.tsx';
import {NumberField} from '@/components/number-field.tsx';
import LabeledCheckbox from '@/components/labeled-checkbox.tsx';
import Collapsible from '@/components/collapsible.tsx';
import Separator from '@/components/separator.tsx';
import ODSSelector from '@/components/ods-selector.tsx';
import {Select} from '@/components/select.tsx';
import Button from '@/components/button.tsx';

export default function GeneralDataForm({corporationTypes}: {
	readonly corporationTypes: CorporationType[];
}) {
	const [showIncFields, setShowIncFields] = useState(false);
	return (
		<form className='max-w-2xl w-full pt-4 flex flex-wrap items-end gap-x-2 mb-32'>
			<h1 className='text-4xl basis-full mb-2'>Registra tu organización</h1>
			<h2 className='text-2xl w-fit mb-2'> Datos generales </h2>
			<p className='text-xs text-stone-300 grow mb-2'>
				* marca un campo requerido
			</p>
			<LabeledInput required label='Nombre' className='grow basis-9/12'/>
			<NumberField
				required
				label='Año de fundación'
				defaultValue={2023}
				className='basis-2/12'
			/>
			<LabeledInput
				label='Teléfono de contacto'
				type='tel'
				className='flex-initial grow basis-full sm:basis-5/12'
			/>
			<LabeledInput
				label='Correo eléctronico de contacto'
				type='email'
				className='flex-initial grow basis-full sm:basis-5/12'
			/>
			<LabeledInput label='Página web' type='url' className='grow basis-full'/>
			<LabeledCheckbox
				label='La organización esta incorporada legalmente.'
				className='basis-full'
				onCheckedChange={state => {
					setShowIncFields(state === true);
				}}
			/>
			<Collapsible open={showIncFields} className='basis-full'>
				<div className='flex flex-wrap items-end gap-x-2'>
					<Separator/>

				</div>
			</Collapsible>
			<Collapsible open={!showIncFields} className='basis-full mt-2'>
				<LabeledCheckbox label='Quiero incorporarme legalmente.'/>
			</Collapsible>
			<Separator/>
			<h2 className='text-2xl mb-2'>Redes sociales</h2>
			<p className='text-xs text-stone-300 grow basis-6/12 mb-2'>
				* marca un campo requerido
			</p>
			<LabeledInput
				label='Facebook'
				type='url'
				className='grow basis-full sm:basis-5/12'
			/>
			<LabeledInput
				label='Instagram'
				type='url'
				className='grow basis-full sm:basis-5/12'
			/>
			<LabeledInput
				label='Twitter'
				type='url'
				className='grow basis-full sm:basis-5/12'
			/>
			<LabeledInput
				label='TikTok'
				type='url'
				className='grow basis-full sm:basis-5/12'
			/>
			<LabeledInput label='YouTube' type='url' className='flex-auto'/>
			<LabeledInput label='LinkedIn' type='url' className='flex-auto'/>
			<Separator/>
			<h2 className='text-xl mb-2 basis-full'>ODS</h2>
			<p className='text-md text-stone-300 mb-2 basis-full'>
				Objetivo de desarrollo sustentable en el cual se enfoca tu organización.
			</p>
			<ODSSelector/>
			<Separator/>
			<Button type='submit'> Confirmar </Button>
		</form>
	);
}
