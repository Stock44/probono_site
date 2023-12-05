'use client';
import React, {useMemo} from 'react';
import {
	type AgeGroup,
	Gender,
	type OrganizationActivity,
	type OrganizationBeneficiary,
	type OrganizationCategory,
} from '@prisma/client';
import {Item, type Key} from 'react-stately';
import {List, Set} from 'immutable';
import OdsSelector from '@/components/ods-selector.tsx';
import Select from '@/components/select.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import ComboBoxTagMultiSelect from '@/components/combo-box-tag-multi-select.tsx';
import AgeGenderGroupSelector, {type GenderedAgeGroup} from '@/app/(logged-in)/my/[organizationId]/purpose/age-gender-group-selector.tsx';
import ActivityPrioritySelector from '@/app/(logged-in)/my/[organizationId]/purpose/activity-priority-selector.tsx';
import useImmutableListData from '@/lib/hooks/use-immutable-list-data.ts';
import useSearchableListData from '@/lib/hooks/use-searchable-list-data.ts';
import Form from '@/components/form.tsx';
import upsertOrganizationAction from '@/lib/actions/[organizationId].ts';
import {formValidators} from '@/lib/form-utils.ts';
import {organizationInitSchema} from '@/lib/schemas/organization.ts';
import {type OrganizationWithPurposeData} from '@/lib/models/organization.ts';

export type PurposeInfoFormProps = {
	readonly organizationCategories: OrganizationCategory[];
	readonly activities: OrganizationActivity[];
	readonly beneficiaries: OrganizationBeneficiary[];
	readonly ageGroups: AgeGroup[];
	readonly organization: OrganizationWithPurposeData;
};

export default function PersonInfoForm(props: PurposeInfoFormProps) {
	const {
		organizationCategories,
		activities,
		beneficiaries,
		ageGroups,
		organization,
	} = props;

	const initialActivities = useMemo(() => {
		const selectedActivities = Set(organization.activities.map(activity => activity.activityId));
		return [...organization.activities.map(activity => activity.activity), ...activities.filter(activity => !selectedActivities.has(activity.id))];
	}, [activities, organization.activities]);

	const activitiesListData = useSearchableListData({
		initialItems: initialActivities,
		initialSelectedKeys: organization.activities.map(activity => activity.activityId),
		getKey(item) {
			return item.id.toString();
		},
		searchKeys: List(['name']),
	});

	console.log(organization.organizationAgeGroups);

	console.log(organization.organizationAgeGroups);

	const initialSelectedAgeGroups = useMemo(() => Set(organization.organizationAgeGroups.map(item => item.ageGroupId.toString())), [organization.organizationAgeGroups]);

	const initialOrganizationAgeGroups = useMemo(
		() => [
			...ageGroups
				.filter(ageGroup => !initialSelectedAgeGroups.has(ageGroup.id.toString()))
				.map(ageGroup => ({
					...ageGroup,
					gender: Gender.other,
				}),
				),
			...organization.organizationAgeGroups.map(ageGroup => ({
				...ageGroup.ageGroup,
				gender: ageGroup.gender,
			})),
		].sort((lhs, rhs) => lhs.minAge - rhs.minAge),
		[ageGroups, initialSelectedAgeGroups, organization.organizationAgeGroups]);

	const ageGroupsListData = useImmutableListData({
		initialItems: initialOrganizationAgeGroups,
		initialSelectedKeys: initialSelectedAgeGroups,
	});

	const beneficiariesListData = useSearchableListData({
		initialItems: beneficiaries,
		initialSelectedKeys: organization.organizationBeneficiaries.map(item => item.id),
		searchKeys: List(['name']),
	});

	const validate = formValidators(organizationInitSchema);

	const selectedAgeGroups = useMemo(() => {
		const {selectedKeys} = ageGroupsListData;
		const selectedAgeGroups = selectedKeys === 'all'
			? ageGroupsListData.items
			: ageGroupsListData.items.filter(item => selectedKeys.has(item.id.toString()));

		return selectedAgeGroups.map(item => ({
			ageGroupId: item.id,
			gender: item.gender,
		})).toArray();
	}, [ageGroupsListData]);

	return (
		<Form
			action={upsertOrganizationAction} id={organization.id} staticValues={{
				ageGroups: selectedAgeGroups,
				activities: (
					activitiesListData.selectedKeys === 'all'
						? activitiesListData.items
						: activitiesListData.items
							.filter(item => (activitiesListData.selectedKeys as unknown as Set<Key>).has(item.id))
				).map((item, idx) => ({activityId: item.id, priority: idx})).toArray(),
				organizationBeneficiaries: [...(beneficiariesListData.selectedKeys === 'all'
					? beneficiaries.map(item => item.id)
					: beneficiariesListData.selectedKeys as Set<number>)],
			}}>
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
					<Icon name='save' className='me-1'/>
					Guardar
				</Button>
			</div>

			<Select
				label='¿Cómo categorizarias a tu organización?' name='organizationCategoryId'
				validate={validate.organizationCategoryId} items={organizationCategories}
				className='w-full mb-4' defaultSelectedKey={organization.organizationCategoryId ?? undefined}
			>
				{
					category => (
						<Item>
							{category.name}
						</Item>
					)
				}
			</Select>
			<OdsSelector
				className='mb-4' label='¿En que ODS se enfoca tu organización?' name='ods'
				validate={validate.ods}
				defaultValue={organization.ods?.toString() ?? undefined}
			/>
			<ActivityPrioritySelector
				label='¿Qué actividades realiza tu organización?'
				prioritizerLabel='Ordenalas de mayor a menor importancia'
				activities={activitiesListData}
			/>
			<ComboBoxTagMultiSelect
				label='¿Quiénes son los principales beneficiarios de tu organización?'
				searchPlaceholder='Escribe aquí para buscar'
				className='mb-4'
				items={beneficiariesListData.items} filteredKeys={beneficiariesListData.filteredKeys}
				filterText={beneficiariesListData.filterText} setFilterText={beneficiariesListData.setFilterText}
				selectedKeys={beneficiariesListData.selectedKeys} setSelectedKeys={beneficiariesListData.setSelectedKeys}
			>
				{
					beneficiary => (
						<Item>
							{beneficiary.name}
						</Item>
					)
				}
			</ComboBoxTagMultiSelect>
			<AgeGenderGroupSelector ageGroups={ageGroupsListData}/>

		</Form>
	);
}
