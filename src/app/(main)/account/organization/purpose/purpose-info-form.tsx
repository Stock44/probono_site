'use client';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	type AgeGroup,
	type OrganizationActivity,
	type OrganizationActivityCategory,
	type OrganizationBeneficiary,
	type OrganizationCategory,
} from '@prisma/client';
import * as Tabs from '@radix-ui/react-tabs';
import Fuse from 'fuse.js';
import {Item} from 'react-stately';
import clsx from 'clsx';
import OdsSelector from '@/components/ods-selector.tsx';
import {LabeledSelect} from '@/components/labeled-select.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import ActivityPrioritySelector from '@/app/(main)/account/organization/purpose/activity-priority-selector.tsx';
import ComboBox from '@/components/combo-box.tsx';
import TagGroup from '@/components/tag-group.tsx';

export default function PersonInfoForm({organizationActivities, organizationCategories, beneficiaries, ageGroups}: {
	readonly organizationCategories: OrganizationCategory[];
	readonly organizationActivities: Array<OrganizationActivityCategory & {activities: OrganizationActivity[]}>;
	readonly beneficiaries: OrganizationBeneficiary[];
	readonly ageGroups: AgeGroup[];
}) {
	const beneficiaryMap: Record<number, OrganizationBeneficiary> = useMemo(() => Object.fromEntries(beneficiaries.map(beneficiary => [beneficiary.id, beneficiary])), [beneficiaries]);

	const beneficiariesFuseRef = useRef<Fuse<OrganizationBeneficiary>>();

	const [beneficiariesFilter, setBeneficiariesFilter] = useState('');

	const [addedBeneficiaries, setAddedBeneficiaries] = useState<number[]>([]);

	const filteredBeneficiaries = useMemo(() => {
		const fuse = beneficiariesFuseRef.current;
		if (fuse === undefined) {
			return beneficiaries;
		}

		if (beneficiariesFilter === '') {
			return beneficiaries;
		}

		return fuse.search(beneficiariesFilter).map(({item}) => item).filter(({id}) => !addedBeneficiaries.includes(id));
	}, [beneficiariesFilter, beneficiaries, addedBeneficiaries]);

	const [selectedActivities, setSelectedActivities] = useState<Record<number, OrganizationActivity>>({});

	const [activityPriorities, setActivityPriorities] = useState<number[]>([]);

	useEffect(() => {
		beneficiariesFuseRef.current = new Fuse(beneficiaries, {
			keys: ['name'],
		});
	}, [beneficiaries]);

	return (
		<form>
			<TagGroup
				className={clsx(addedBeneficiaries.length > 0 && 'mb-2')}
				label='Beneficiarios' items={addedBeneficiaries.map(key => beneficiaryMap[key])} onRemove={keys => {
					setAddedBeneficiaries(previousState => previousState.filter(key => !keys.has(key)));
				}}>
				{beneficiary => <Item>{beneficiary.name}</Item>}
			</TagGroup>
			<ComboBox
				icon='add'
				aria-label='beneficiaries' items={filteredBeneficiaries} selectedKey={null}
				inputValue={beneficiariesFilter}
				onSelectionChange={key => {
					if (key === null) {
						return;
					}

					setAddedBeneficiaries(previousState => [...previousState, key as number]);
					setBeneficiariesFilter('');
				}}
				onInputChange={setBeneficiariesFilter}
			>
				{
					beneficiary => (
						<Item>
							{beneficiary.name}
						</Item>
					)
				}
			</ComboBox>

			<LabeledSelect
				label='¿Cómo categorizarías a tu organización?' values={organizationCategories.map(({id}) => id)}
				labels={organizationCategories.map(({name}) => name)}/>
			<h3 className='text-stone-300'>
				¿Qué actividades realiza tu organización?
			</h3>
			<p className='text-stone-400 text-sm mb-4'>
				Ordenalas de mayor a menor importancia.
			</p>
			<div className='flex gap-2 mb-4'>
				<ActivityPrioritySelector
					selectedActivities={selectedActivities} priorities={activityPriorities}
					onPrioritiesChange={setActivityPriorities}
					onSelectedActivitiesChange={setSelectedActivities}/>
				<Tabs.Root
					defaultValue={organizationActivities[0].id.toString()}
					className='p-2 border-stone-800 border rounded grow basis-5/12'>
					<Tabs.TabsList className='mb-4 flex flex-wrap'>
						{organizationActivities.map(({id, name}) => (
							<Tabs.Trigger
								key={id} value={id.toString()}
								className='text-stone-400 hover:text-stone-300 p-2 data-[state=active]:text-stone-50 data-[state=active]:border-b border-stone-50'>{name}</Tabs.Trigger>
						))}
					</Tabs.TabsList>
					{
						organizationActivities.map(({id, activities}) => (
							<Tabs.Content key={id} value={id.toString()} className='flex flex-wrap gap-2'>
								{
									activities.filter(activity => !(activity.id in selectedActivities)).map(activity => (
										<Button
											key={activity.id} variant='secondary' onPress={() => {
												setActivityPriorities([...activityPriorities, activity.id]);
												setSelectedActivities({
													...selectedActivities,
													[activity.id]: activity,
												});
											}}>
											<Icon iconName='add'/>
											{activity.name}
										</Button>
									))
								}
							</Tabs.Content>
						))
					}
				</Tabs.Root>
			</div>

			<h3 className='text-stone-300 text-lg mb-4'>
				Selecciona el ODS que atiende tu organización
			</h3>
			<OdsSelector/>
		</form>
	);
}
