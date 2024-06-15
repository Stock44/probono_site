'use client';
import React, {useState} from 'react';
import {
	CluniStatus,
	type CorporationType,
	DonationAuthStatus,
	type Organization,
} from '@prisma/client';
import {Item} from 'react-stately';
import CalendarMonth from '@material-design-icons/svg/round/calendar_month.svg';
import Done from '@material-design-icons/svg/round/done.svg';
import {
	organizationInitSchema,
	type OrganizationUpdate,
} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';

import {Select, NumberField, Checkbox, TextField} from 'geostats-ui';
import {Form, FormHeader, FormState} from '@/components/form';

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
	readonly action: (
		state: FormState<OrganizationUpdate>,
		data: FormData,
	) => Promise<FormState<OrganizationUpdate>>;
};

export default function LegalInfoForm(props: LegalInfoFormProps) {
	const {organization, corporationTypes, action} = props;

	const [enabled, setEnabled] = useState(organization.isIncorporated);

	const validate = formValidators(organizationInitSchema);

	return (
		<Form
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done />,
			}}
			action={action}
			staticValues={{
				isIncorporated: enabled ? undefined : false,
			}}
		>
			<FormHeader
				title='Datos legales'
				description='Información legal de tu organización.'
			/>
			<Checkbox
				name='isIncorporated'
				value='true'
				validate={validate.isIncorporated}
				className='mb-4'
				isSelected={enabled}
				onChange={isSelected => {
					setEnabled(isSelected);
				}}
			>
				La organización esta incorporada legalmente.
			</Checkbox>
			<div className='flex flex-wrap gap-2'>
				<TextField
					name='legalConcept'
					defaultValue={organization.legalConcept ?? undefined}
					isDisabled={!enabled}
					label='Razón social'
					className='mb-4 grow basis-9/12'
				/>
				<Select
					placeholder='Tipo'
					name='corporationTypeId'
					defaultSelectedKey={
						organization.corporationTypeId ?? undefined
					}
					validate={validate.corporationTypeId}
					isDisabled={!enabled}
					label='Tipo'
					className='mb-4 basis-full md:basis-2/12'
					items={corporationTypes}
				>
					{corporationType => (
						<Item>
							{corporationType.shortName ?? corporationType.name}
						</Item>
					)}
				</Select>
			</div>

			<div className='flex-none gap-2 lg:flex'>
				<TextField
					label='RFC'
					name='rfc'
					validate={validate.rfc}
					defaultValue={organization.rfc ?? undefined}
					isDisabled={!enabled}
					className='mb-4 grow basis-8/12'
				/>
				<NumberField
					isDisabled={!enabled}
					name='incorporationYear'
					icon={
						<CalendarMonth
							viewBox='0 0 24 24'
							className='size-4 fill-stone-600 group-focus-within:fill-stone-50'
						/>
					}
					validate={validate.incorporationYear}
					defaultValue={organization.incorporationYear ?? undefined}
					label='Año de incorporación'
					className='mb-4 basis-3/12'
					formatOptions={{
						useGrouping: false,
					}}
				/>
			</div>
			<div className='flex-none gap-2 lg:flex'>
				<Select
					label='Estatus de CLUNI'
					name='cluniStatus'
					validate={validate.cluniStatus}
					defaultSelectedKey={organization.cluniStatus ?? undefined}
					isDisabled={!enabled}
					className='mb-4 w-full grow basis-full sm:basis-5/12'
					placeholder='Selecciona un valor'
					items={clunis}
				>
					{cluni => <Item>{cluni.label}</Item>}
				</Select>
				<Select
					label='Estatus de donataria autorizada'
					className='mb-4 w-full grow basis-full sm:basis-5/12'
					name='donationAuthStatus'
					validate={validate.donationAuthStatus}
					defaultSelectedKey={
						organization.donationAuthStatus ?? undefined
					}
					isDisabled={!enabled}
					placeholder='Selecciona un valor'
					items={donationStatuses}
				>
					{donationStatus => <Item>{donationStatus.label}</Item>}
				</Select>
			</div>
		</Form>
	);
}
