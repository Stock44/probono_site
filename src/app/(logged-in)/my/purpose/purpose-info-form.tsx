'use client';
import React, {useMemo} from 'react';
import {
	type Activity,
	type AgeGroup, type Beneficiary,
	Gender, type Organization,
	type OrganizationCategory, type OrganizationToActivity, type OrganizationToAgeGroup,
} from '@prisma/client';
import {Item, type Key} from 'react-stately';
import {List, Set} from 'immutable';
import Save from '@material-design-icons/svg/round/save.svg';
import Done from '@material-design-icons/svg/round/done.svg';
import OdsSelector from '@/app/(logged-in)/my/purpose/ods-selector.tsx';
import Select from '@/components/select.tsx';
import ComboBoxTagMultiSelect from '@/components/combo-box-tag-multi-select.tsx';
import AgeGenderGroupSelector from '@/app/(logged-in)/my/purpose/age-gender-group-selector.tsx';
import ActivityPrioritySelector from '@/app/(logged-in)/my/purpose/activity-priority-selector.tsx';
import useImmutableListData from '@/lib/hooks/use-immutable-list-data.ts';
import useSearchableListData from '@/lib/hooks/use-searchable-list-data.ts';
import Form, {type FormState} from '@/components/form.tsx';
import {formValidators} from '@/lib/form-utils.ts';
import {organizationInitSchema, type OrganizationUpdate} from '@/lib/schemas/organization.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type PurposeInfoFormProps = {
	readonly organizationCategories: OrganizationCategory[];
	readonly activities: Activity[];
	readonly beneficiaries: Beneficiary[];
	readonly ageGroups: AgeGroup[];
	readonly organization: Organization & {
		readonly beneficiaries: Beneficiary[];
		readonly ageGroups: Array<OrganizationToAgeGroup & {
			ageGroup: AgeGroup;
		}>;
		readonly activities: Array<OrganizationToActivity & {
			activity: Activity;
		}>;
	};
	readonly action: (state: FormState<OrganizationUpdate>, data: FormData) => Promise<FormState<OrganizationUpdate>>;
};

export default function PersonInfoForm(props: PurposeInfoFormProps) {
	const {
		organizationCategories,
		activities,
		beneficiaries,
		ageGroups,
		organization,
		action,
	} = props;

	const initialActivities = useMemo(() => {
		const selectedActivities = Set(organization.activities.map(activity => activity.activityId));
		return [...organization.activities.map(activity => activity.activity), ...activities.filter(activity => !selectedActivities.has(activity.id))];
	}, [activities, organization.activities]);

	const activitiesListData = useSearchableListData({
		initialItems: initialActivities,
		initialSelectedKeys: organization.activities.map(activity => activity.activityId),
		getKey(item) {
			return item.id;
		},
		searchKeys: List(['name']),
	});

	const initialSelectedAgeGroups = useMemo(() => Set(organization.ageGroups.map(item => item.ageGroupId.toString())), [organization.ageGroups]);

	const initialOrganizationAgeGroups = useMemo(
		() => [
			...ageGroups
				.filter(ageGroup => !initialSelectedAgeGroups.has(ageGroup.id.toString()))
				.map(ageGroup => ({
					...ageGroup,
					gender: Gender.other,
				}),
				),
			...organization.ageGroups.map(ageGroup => ({
				...ageGroup.ageGroup,
				gender: ageGroup.gender,
			})),
		].sort((lhs, rhs) => lhs.minAge - rhs.minAge),
		[ageGroups, initialSelectedAgeGroups, organization.ageGroups]);

	const ageGroupsListData = useImmutableListData({
		initialItems: initialOrganizationAgeGroups,
		initialSelectedKeys: initialSelectedAgeGroups,
	});

	const beneficiariesListData = useSearchableListData({
		initialItems: beneficiaries,
		initialSelectedKeys: organization.beneficiaries.map(item => item.id),
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
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done/>,
			}}
			action={action} staticValues={{
				ageGroups: selectedAgeGroups,
				activities: (
					activitiesListData.selectedKeys === 'all'
						? activitiesListData.items
						: activitiesListData.items
							.filter(item => (activitiesListData.selectedKeys as unknown as Set<Key>).has(item.id))
				).map((item, idx) => ({activityId: item.id, priority: idx})).toArray(),
				beneficiaries: [...(beneficiariesListData.selectedKeys === 'all'
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
				<SubmitButton icon={<Save/>}>
					Guardar
				</SubmitButton>
			</div>

			<Select
				label='¿Cómo categorizarias a tu organización?' name='categoryId'
				validate={validate.categoryId} items={organizationCategories}
				className='mb-4' defaultSelectedKey={organization.categoryId ?? undefined}
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
