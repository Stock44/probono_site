'use client';
import React, {useState} from 'react';
import {CluniStatus, type CorporationType, DonationAuthStatus} from '@prisma/client';
import {LabeledInput} from '@/components/labeled-input.tsx';
import {LabeledSelect} from '@/components/labeled-select.tsx';
import {NumberInput} from '@/components/number-input.tsx';
import LabeledCheckbox from '@/components/labeled-checkbox.tsx';

export default function LegalInfoForm({corporationTypes}: {readonly corporationTypes: CorporationType[]}) {
	const [enabled, setEnabled] = useState(false);
	return (
		<form>
			<h2 className='text-2xl mb-2'>Información legal</h2>
			<LabeledCheckbox
				label='Estamos incorporados legalmente' checked={enabled} onCheckedChange={() => {
					setEnabled(!enabled);
				}}/>
			<LabeledInput
				required
				disabled={!enabled}
				label='Razón social'
				className='grow basis-9/12'
			/>
			<LabeledSelect
				required
				disabled={!enabled}
				label='Tipo'
				className='basis-2/12'
				values={corporationTypes.map(corpType => corpType.id.toString())}
				labels={corporationTypes.map(
					corpType => corpType.shortName ?? corpType.name,
				)}
			/>

			<LabeledInput label='RFC' disabled={!enabled} className='grow basis-8/12'/>
			<NumberInput
				required
				disabled={!enabled}
				label='Año de incorporación'
				defaultValue={2023}
				className='basis-3/12'
			/>
			<LabeledSelect
				label='Estatus de CLUNI'
				disabled={!enabled}
				className='grow basis-full sm:basis-5/12'
				placeholder='Selecciona un valor'
				values={[
					CluniStatus.active,
					CluniStatus.inactive,
					CluniStatus.inProgress,
					CluniStatus.no,
				]}
				labels={[
					'Contamos con CLUNI activa',
					'Contamos con CLUNI, actualmente inactiva',
					'Trámite en proceso',
					'No contamos con CLUNI',
				]}
			/>
			<LabeledSelect
				label='Estatus de donataria autorizada'
				className='grow basis-full sm:basis-5/12'
				disabled={!enabled}
				placeholder='Selecciona un valor'
				values={[
					DonationAuthStatus.notAuthorized,
					DonationAuthStatus.authorized,
					DonationAuthStatus.inProgress,
					DonationAuthStatus.inRecovery,
				]}
				labels={[
					'No contamos con donataria autorizada',
					'Sí contamos con donataria autorizada',
					'En proceso de autorización',
					'En proceso de recuperación',
				]}
			/>
		</form>
	);
}
