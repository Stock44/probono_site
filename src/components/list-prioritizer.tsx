import React, {useState, useMemo} from 'react';
import clsx from 'clsx';
import {Seq, Map} from 'immutable';
import {type Key} from 'react-stately';
import Icon from '@/components/icon.tsx';
import Spacer from '@/components/spacer.tsx';
import Button from '@/components/button.tsx';
import useReorderableListState, {type ReorderableListStateProps} from '@/lib/hooks/use-reorderable-list-state.ts';

export type ListPrioritizerProps<T extends Record<string, unknown>> = {
	readonly onRemove: (key: Key) => void;
	readonly label?: string;
	readonly className?: string;
} & ReorderableListStateProps<T>;

export default function ListPrioritizer<T extends Record<string, unknown>>(
	props: ListPrioritizerProps<T>,
) {
	const {onRemove, className} = props;

	const {collection, reorder} = useReorderableListState(props);

	const [dragStartY, setDragStartY] = useState(0);

	const [deltaY, setDeltaY] = useState(0);

	const [activityRefs, setActivityRefs] = useState<Map<Key, HTMLDivElement>>(Map());

	const [draggedActivity, setDraggedActivity] = useState<Key | undefined>(undefined);

	const handleMove = (deltaY: number, key: Key) => {
		setDeltaY(deltaY);

		const previousKey = collection.getKeyBefore(key.toString());
		if (previousKey !== null && previousKey !== undefined) {
			const previousContainer = activityRefs.get(key.toString());
			if (previousContainer !== undefined && deltaY < -((previousContainer.clientHeight / 2))) {
				setDragStartY(previousContainer.getBoundingClientRect().y);
				setDeltaY(0);
				reorder(key.toString(), previousKey.toString());
			}
		}

		const nextKey = collection.getKeyAfter(key.toString());
		if (nextKey !== null && nextKey !== undefined) {
			const nextContainer = activityRefs.get(key.toString());
			if (nextContainer !== undefined && deltaY > (nextContainer.clientHeight)) {
				setDragStartY(nextContainer.getBoundingClientRect().y + (nextContainer.clientHeight / 2));
				setDeltaY(0);
				reorder(key.toString(), undefined, nextKey.toString());
			}
		}
	};

	const touchStartHandler = (key: Key) => ((event: React.TouchEvent) => {
		setDraggedActivity(key.toString());
		const rect = event.currentTarget.getBoundingClientRect();
		setDragStartY(rect.y + (rect.height / 2));
	});

	const dragStartHandler = (key: Key) => ((event: React.DragEvent) => {
		event.dataTransfer.setDragImage(new Image(), 0, 0);
		setDraggedActivity(key.toString());
		const rect = event.currentTarget.getBoundingClientRect();
		setDragStartY(rect.y + (rect.height / 2));
	});

	const touchHandler = (key: Key) => ((event: React.TouchEvent) => {
		if (event.touches.length !== 1) {
			return;
		}

		const deltaY = event.touches[0].clientY - dragStartY;

		handleMove(deltaY, key.toString());
	});

	const dragHandler = (key: Key) => ((event: React.DragEvent) => {
		if (event.clientY === 0) {
			return;
		}

		const deltaY = event.clientY - dragStartY;

		handleMove(deltaY, key.toString());
	});

	const dragEndHandler = () => {
		setDraggedActivity(undefined);
		setDragStartY(0);
		setDeltaY(0);
	};

	const draggedActivityOffset = useMemo(() => {
		if (draggedActivity === undefined) {
			return undefined;
		}

		if (draggedActivity === collection.getFirstKey()?.toString() && deltaY < 0) {
			return '0px';
		}

		if (draggedActivity === collection.getLastKey()?.toString() && deltaY > 0) {
			return '0px';
		}

		return `${deltaY}px`;
	}, [collection, deltaY, draggedActivity]);

	return (
		<div className={clsx('grow basis-5/12 border border-stone-700 rounded divide-stone-700 divide-y', className)}>
			{
				Seq(collection).map(activity => (
					<div
						key={activity.key}
						className={clsx('relative')}
						style={{
							height: draggedActivity === activity.key.toString() ? `${activityRefs.get(activity.key.toString())?.clientHeight ?? 0}px` : undefined,
						}}
					>
						<div
							ref={element => {
								if (element !== null) {
									setActivityRefs(current => current.set(activity.key, element));
								}
							}}
							className={clsx(
								draggedActivity === activity.key && 'absolute z-10 bg-stone-900 w-full border-y border-stone-700',
								draggedActivity === undefined && 'hover:bg-stone-900',
								'flex items-center gap-4 rounded grow text-stone-200 p-2 group select-none left-0')}
							style={{
								top: draggedActivity === activity.key ? draggedActivityOffset : undefined,
							}}
						>
							<Icon
								draggable name='drag_handle'
								className='text-stone-400 cursor-grab touch-none'
								onTouchStart={touchStartHandler(activity.key)}
								onTouchMove={touchHandler(activity.key)}
								onTouchEnd={dragEndHandler}
								onDragStart={dragStartHandler(activity.key)} onDrag={dragHandler(activity.key)}
								onDragEnd={dragEndHandler}
							/>
							{activity.rendered}
							<Spacer/>
							<Button
								className='bg-transparent hover:bg-stone-700'
								variant='text' onPress={() => {
									onRemove(activity.key);
								}}>
								<Icon name='remove'/>
							</Button>
						</div>
					</div>
				))
			}
		</div>
	);
}
