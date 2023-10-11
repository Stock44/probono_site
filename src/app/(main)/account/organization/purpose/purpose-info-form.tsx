'use client';
import React, {useState} from 'react';
import {
	type AgeGroup,
	type OrganizationActivity,
	type OrganizationActivityCategory,
	type OrganizationBeneficiary,
	type OrganizationCategory,
} from '@prisma/client';
import * as Tabs from '@radix-ui/react-tabs';
import OdsSelector from '@/components/ods-selector.tsx';
import {LabeledSelect} from '@/components/labeled-select.tsx';
import Icon from '@/components/icon.tsx';
import {Button} from '@/components/button.tsx';
import ActivityPrioritySelector from '@/app/(main)/account/organization/purpose/activity-priority-selector.tsx';
import InputWithIcon from '@/components/input-with-icon.tsx';

export default function PersonInfoForm({organizationActivities, organizationCategories, beneficiaries, ageGroups}: {
	readonly organizationCategories: OrganizationCategory[];
	readonly organizationActivities: Array<OrganizationActivityCategory & {activities: OrganizationActivity[]}>;
	readonly beneficiaries: OrganizationBeneficiary[];
	readonly ageGroups: AgeGroup[];
}) {
	const [selectedActivities, setSelectedActivities] = useState<Record<number, OrganizationActivity>>({});

	const [activityPriorities, setActivityPriorities] = useState<number[]>([]);

	const [beneficiariesFilter, setBeneficiariesFilter] = useState();

	return (
		<form>
			<InputWithIcon
				iconName='search' value={beneficiariesFilter} onChange={event => {
					setBeneficiariesFilter(event.target.value);
				}}/>
			<div className='flex flex-wrap'>
				{
					beneficiaries.map(beneficiary => (
						<Button key={beneficiary.id} variant='secondary'>
							{beneficiary.name}
						</Button>
					))
				}
			</div>
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
				<ActivityPrioritySelector selectedActivities={selectedActivities} priorities={activityPriorities} onPrioritiesChange={setActivityPriorities} onSelectedActivitiesChange={setSelectedActivities}/>
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
											key={activity.id} variant='secondary' onClick={() => {
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
