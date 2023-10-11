import React, {useState} from 'react';
import {type OrganizationActivity} from '@prisma/client';
import clsx from 'clsx';
import {omit} from 'lodash';
import Icon from '@/components/icon.tsx';
import Spacer from '@/components/spacer.tsx';
import {Button} from '@/components/button.tsx';

export default function ActivityPrioritySelector(
	{
		selectedActivities,
		priorities,
		onPrioritiesChange,
		onSelectedActivitiesChange,
	}:
	{
		readonly selectedActivities: Record<number, OrganizationActivity>;
		readonly priorities: number[];
		readonly onPrioritiesChange: (newPriorities: number[]) => void;
		readonly onSelectedActivitiesChange: (newSelectedActivities: Record<number, OrganizationActivity>) => void;
	}) {
	const [dragStartY, setDragStartY] = useState(0);

	const [deltaY, setDeltaY] = useState(0);

	const [activityRefs, setActivityRefs] = useState<Record<number, HTMLDivElement | undefined>>({});

	const [draggedActivity, setDraggedActivity] = useState<number | undefined>(undefined);

	const touchStartHandler = (activityId: number) => ((event: React.TouchEvent) => {
		setDraggedActivity(activityId);
		const rect = event.currentTarget.getBoundingClientRect();
		setDragStartY(rect.y + (rect.height / 2));
	});

	const dragStartHandler = (activityId: number) => ((event: React.DragEvent) => {
		event.dataTransfer.setDragImage(new Image(), 0, 0);
		setDraggedActivity(activityId);
		const rect = event.currentTarget.getBoundingClientRect();
		setDragStartY(rect.y + (rect.height / 2));
	});

	const gap = 8;

	const touchHandler = (priority: number) => ((event: React.TouchEvent) => {
		if (event.touches.length !== 1) {
			return;
		}

		const deltaY = event.touches[0].clientY - dragStartY;
		setDeltaY(deltaY);

		if (priority !== 0) {
			const previous = activityRefs[priorities[priority - 1]];
			if (previous !== undefined && deltaY < -(gap + (previous.clientHeight / 2))) {
				setDragStartY(previous.getBoundingClientRect().y + (previous.clientHeight / 2));
				setDeltaY(0);
				const newPriorities = [...priorities];
				newPriorities[priority] = priorities[priority - 1];
				newPriorities[priority - 1] = priorities[priority];
				onPrioritiesChange(newPriorities);
			}
		}

		if ((priority + 1) < priorities.length) {
			const next = activityRefs[priorities[priority + 1]];
			if (next !== undefined && deltaY > (gap + next.clientHeight)) {
				setDragStartY(next.getBoundingClientRect().y + (next.clientHeight / 2));
				setDeltaY(0);
				const newPriorities = [...priorities];
				newPriorities[priority] = priorities[priority + 1];
				newPriorities[priority + 1] = priorities[priority];
				onPrioritiesChange(newPriorities);
			}
		}
	});

	const dragHandler = (priority: number) => ((event: React.DragEvent) => {
		if (event.clientY === 0) {
			return;
		}

		const deltaY = event.clientY - dragStartY;
		setDeltaY(deltaY);
		if (priority !== 0) {
			const previous = activityRefs[priorities[priority - 1]];
			if (previous !== undefined && deltaY < -(gap + (previous.clientHeight / 2))) {
				setDragStartY(previous.getBoundingClientRect().y + (previous.clientHeight / 2));
				setDeltaY(0);
				const newPriorities = [...priorities];
				newPriorities[priority] = priorities[priority - 1];
				newPriorities[priority - 1] = priorities[priority];
				onPrioritiesChange(newPriorities);
			}
		}

		if ((priority + 1) < priorities.length) {
			const next = activityRefs[priorities[priority + 1]];
			if (next !== undefined && deltaY > (gap + next.clientHeight)) {
				setDragStartY(next.getBoundingClientRect().y + (next.clientHeight / 2));
				setDeltaY(0);
				const newPriorities = [...priorities];
				newPriorities[priority] = priorities[priority + 1];
				newPriorities[priority + 1] = priorities[priority];
				onPrioritiesChange(newPriorities);
			}
		}
	});

	const dragEndHandler = () => {
		setDraggedActivity(undefined);
		setDragStartY(0);
		setDeltaY(0);
	};

	return (
		<div className='grow basis-5/12 flex flex-col gap-2 items-stretch'>
			{Object.keys(selectedActivities).length === 0
				? <p className='text-stone-400 text-sm '>Selecciona una actividad</p>
				: priorities.map(id => selectedActivities[id]).map((activity, priority) => (
					<div
						key={activity.id} className='flex items-center relative '
					>
						<p className='text-stone-300 font-bold w-8 flex-shrink-0 text-center'>
							{priority + 1}
						</p>
						{
							draggedActivity === activity.id
								? <div
									className='rounded bg-stone-900 grow'
									style={{
										height: activityRefs[activity.id] === undefined ? undefined : `${activityRefs[activity.id]!.clientHeight}px`,
									}}
								/> : null
						}
						<div
							ref={element => {
								if (element !== null && activityRefs[activity.id] !== element) {
									setActivityRefs({
										...activityRefs,
										[activity.id]: element,
									});
								}
							}}
							className={clsx(
								draggedActivity === activity.id && 'absolute z-10 w-[calc(100%-32px)] bg-stone-900',
								draggedActivity === undefined && 'hover:bg-stone-900',
								'grow text-stone-200 flex p-1 items-center gap-4 border border-stone-700 rounded touch-none  group')}
							style={{
								left: '32px',
								top: draggedActivity === activity.id ? `${deltaY}px` : undefined,
							}}
							onTouchStart={touchStartHandler(activity.id)}
							onTouchMove={touchHandler(priority)}
							onTouchEnd={dragEndHandler}
						>
							<Icon
								draggable iconName='drag_handle'
								className='text-stone-400 cursor-grab'
								onDragStart={dragStartHandler(activity.id)} onDrag={dragHandler(priority)}
								onDragEnd={dragEndHandler}
							/>
							{activity.name}
							<Spacer/>
							<Button
								className='bg-transparent hover:bg-stone-700'
								variant='tertiary' onClick={() => {
									onSelectedActivitiesChange(omit(selectedActivities, [activity.id]));
									onPrioritiesChange(priorities.filter(activityId => activityId !== activity.id));
								}}>
								<Icon iconName='remove'/>
							</Button>
						</div>
					</div>
				))}
		</div>
	);
}
