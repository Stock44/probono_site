'use client';
import React, {useMemo, useState} from 'react';
import {
	type AgeGroup, Gender,
	type OrganizationActivity,
	type OrganizationBeneficiary,
	type OrganizationCategory,
} from '@prisma/client';
import {Item} from 'react-stately';
import {List, Seq} from 'immutable';
import OdsSelector from '@/components/ods-selector.tsx';
import Select from '@/components/select.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import ComboBoxTagMultiSelect from '@/components/combo-box-tag-multi-select.tsx';
import AgeGenderGroupSelector, {
	type GenderedAgeGroup,
} from '@/app/(main)/account/organization/purpose/age-gender-group-selector.tsx';
import ActivityPrioritySelector from '@/app/(main)/account/organization/purpose/activity-priority-selector.tsx';
import useImmutableListData from '@/lib/hooks/use-immutable-list-data.ts';
import useSearchableListData from '@/lib/hooks/use-searchable-list-data.ts';

export default function PersonInfoForm({activities, organizationCategories, beneficiaries, ageGroups}: {
	readonly organizationCategories: OrganizationCategory[];
	readonly activities: OrganizationActivity[];
	readonly beneficiaries: OrganizationBeneficiary[];
	readonly ageGroups: AgeGroup[];
}) {
	const activitiesListData = useSearchableListData({
		initialItems: activities,
		searchKeys: List(['name']),
	});

	const genderedAgeGroups: List<GenderedAgeGroup> = useMemo(() => List(ageGroups).map(ageGroup => ({
		...ageGroup,
		gender: Gender.other,
	})), [ageGroups]);

	const ageGroupsListData = useImmutableListData({
		initialItems: genderedAgeGroups,
	});

	const beneficiariesListData = useSearchableListData({
		initialItems: beneficiaries,
		searchKeys: List(['name']),
	});

	const [selectedOds, setSelectedOds] = useState<number>();

	return (
		<form>
			<div className='flex justify-between items-end mb-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Propósito
					</h1>
					<p className='text-stone-300'>
						Esta información nos dice lo que tu organización hace, su objetivo y a quienes beneficia.
					</p>
				</div>
				<Button type='submit'>
					<Icon iconName='save' className='me-1'/>
					Guardar
				</Button>
			</div>

			<Select label='¿Cómo categorizarias a tu organización?' items={organizationCategories} className='w-full mb-4'>
				{
					category => (
						<Item>
							{category.name}
						</Item>
					)
				}
			</Select>
			<OdsSelector value={selectedOds} className='mb-4' onChange={setSelectedOds}/>
			<ActivityPrioritySelector label='¿Qué actividades realiza tu organización?' prioritizerLabel='Ordenalas de mayor a menor importancia' activities={activitiesListData}/>
			<ComboBoxTagMultiSelect
				label='¿Quiénes son los principales beneficiarios de tu organización?'
				searchPlaceholder='Escribe aquí para buscar'
				className='mb-4'
				items={beneficiariesListData.items} filteredKeys={beneficiariesListData.filteredKeys}
				filterText={beneficiariesListData.filterText} setFilterText={beneficiariesListData.setFilterText}
				selectedKeys={beneficiariesListData.selectedKeys} setSelectedKeys={beneficiariesListData.setSelectedKeys}>
				{
					beneficiary => (
						<Item>
							{beneficiary.name}
						</Item>
					)
				}
			</ComboBoxTagMultiSelect>
			<AgeGenderGroupSelector ageGroups={ageGroupsListData}/>

		</form>
	);
}
