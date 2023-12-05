'use client';
import React, {useState} from 'react';
import {CluniStatus, type CorporationType, DonationAuthStatus, type Organization} from '@prisma/client';
import {Item} from 'react-stately';
import {LabeledInput} from '@/components/labeled-input.tsx';
import Select from '@/components/select.tsx';
import {NumberField} from '@/components/number-field.tsx';
import LabeledCheckbox from '@/components/labeled-checkbox.tsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import Checkbox from '@/components/checkbox.tsx';
import TextField from '@/components/text-field.tsx';
import Form from '@/components/form.tsx';
import upsertOrganizationAction from '@/lib/actions/[organizationId].ts';
import {organizationInitSchema} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

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

export type LegalInfoFormProps = {
	readonly organization: Organization;
	readonly corporationTypes: CorporationType[];
};

const legalFields = ['legalConcept', 'incorporationYear', 'rfc', 'donationAuthStatus', 'cluniStatus', 'corporationTypeId'] as const;

export default function LegalInfoForm(props: LegalInfoFormProps) {
	const {organization, corporationTypes} = props;

	const [enabled, setEnabled] = useState(organization.isIncorporated);

	const validate = formValidators(organizationInitSchema);

	return (
		<Form
			id={organization.id}
			action={upsertOrganizationAction} staticValues={{
				isIncorporated: enabled ? undefined : false,
			}}>
			<div className='flex justify-between items-end mb-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Datos legales
					</h1>
					<p className='text-stone-300'>
						Aquí va la información legal de tu organización.
					</p>
				</div>
				<SubmitButton>
					<Icon name='save' className='me-1'/>
					Guardar
				</SubmitButton>
			</div>
			<Checkbox
				name='isIncorporated'
				value='true'
				validate={validate.isIncorporated}
				className='mb-4'
				isSelected={enabled} onChange={isSelected => {
					setEnabled(isSelected);
				}}>
				La organización esta incorporada legalmente.
			</Checkbox>
			<div className='flex gap-2'>
				<TextField
					name='legalConcept'
					defaultValue={organization.legalConcept ?? undefined}
					isDisabled={!enabled}
					label='Razón social'
					className='grow basis-9/12 mb-4'
				/>
				<Select
					placeholder='Tipo'
					name='corporationTypeId'
					defaultSelectedKey={organization.corporationTypeId ?? undefined}
					validate={validate.corporationTypeId}
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
				<TextField
					label='RFC'
					name='rfc'
					validate={validate.rfc}
					defaultValue={organization.rfc ?? undefined}
					isDisabled={!enabled}
					className='grow basis-8/12'
				/>
				<NumberField
					isDisabled={!enabled}
					name='incorporationYear'
					icon='calendar_month'
					validate={validate.incorporationYear}
					defaultValue={organization.incorporationYear ?? undefined}
					label='Año de incorporación'
					className='basis-3/12'
					formatOptions={{
						useGrouping: false,
					}}
				/>

			</div>
			<div className='flex gap-2'>
				<Select
					label='Estatus de CLUNI'
					name='cluniStatus'
					validate={validate.cluniStatus}
					defaultSelectedKey={organization.cluniStatus ?? undefined}
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
					name='donationAuthStatus'
					validate={validate.donationAuthStatus}
					defaultSelectedKey={organization.donationAuthStatus ?? undefined}
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

		</Form>
	);
}
