import React, {useMemo, useState} from 'react';
import {Map, Seq} from 'immutable';
import {type Key} from 'react-stately';
// @ts-expect-error bad typings
import DragHandle from '@material-design-icons/svg/round/drag_handle.svg';
// @ts-expect-error bad typings
import Remove from '@material-design-icons/svg/round/remove.svg';
import {Spacer} from '@/spacer.tsx';
import {Button} from '@/button/button.tsx';
import useReorderableListState, {
	type ReorderableListStateProps,
} from '@/hooks/use-reorderable-list-state.ts';
import {cx} from '@/cva.ts';

export type ListPrioritizerProps<T extends Record<string, unknown>> = {
	readonly onRemove: (key: Key) => void;
	readonly className?: string;
} & ReorderableListStateProps<T>;

export function ListPrioritizer<T extends Record<string, unknown>>(
	props: ListPrioritizerProps<T>,
) {
	const {onRemove, className} = props;

	const {collection, reorder} = useReorderableListState(props);

	const [dragStartY, setDragStartY] = useState(0);

	const [deltaY, setDeltaY] = useState(0);

	const [activityReferences, setActivityReferences] =
		useState<Map<Key, HTMLDivElement>>(Map());

	const [draggedActivity, setDraggedActivity] = useState<Key | undefined>();

	const handleMove = (deltaY: number, key: Key) => {
		setDeltaY(deltaY);

		const previousKey = collection.getKeyBefore(key);
		if (previousKey !== null && previousKey !== undefined) {
			const previousContainer = activityReferences.get(key);
			if (
				previousContainer !== undefined &&
				deltaY < -(previousContainer.clientHeight / 2)
			) {
				setDragStartY(previousContainer.getBoundingClientRect().y);
				setDeltaY(0);
				reorder(key, previousKey);
			}
		}

		const nextKey = collection.getKeyAfter(key);
		if (nextKey !== null && nextKey !== undefined) {
			const nextContainer = activityReferences.get(key);
			if (
				nextContainer !== undefined &&
				deltaY > nextContainer.clientHeight
			) {
				setDragStartY(
					nextContainer.getBoundingClientRect().y +
						nextContainer.clientHeight / 2,
				);
				setDeltaY(0);
				reorder(key, undefined, nextKey);
			}
		}
	};

	const touchStartHandler = (key: Key) => (event: React.TouchEvent) => {
		setDraggedActivity(key);
		const rect = event.currentTarget.getBoundingClientRect();
		setDragStartY(rect.y + rect.height / 2);
	};

	const dragStartHandler = (key: Key) => (event: React.DragEvent) => {
		event.dataTransfer.setDragImage(new Image(), 0, 0);
		setDraggedActivity(key);
		const rect = event.currentTarget.getBoundingClientRect();
		setDragStartY(rect.y + rect.height / 2);
	};

	const touchHandler = (key: Key) => (event: React.TouchEvent) => {
		if (event.touches.length !== 1) {
			return;
		}

		const deltaY = event.touches[0].clientY - dragStartY;

		handleMove(deltaY, key);
	};

	const dragHandler = (key: Key) => (event: React.DragEvent) => {
		if (event.clientY === 0) {
			return;
		}

		const deltaY = event.clientY - dragStartY;

		handleMove(deltaY, key);
	};

	const dragEndHandler = () => {
		setDraggedActivity(undefined);
		setDragStartY(0);
		setDeltaY(0);
	};

	const draggedActivityOffset = useMemo(() => {
		if (draggedActivity === undefined) {
			return;
		}

		if (draggedActivity === collection.getFirstKey() && deltaY < 0) {
			return '0px';
		}

		if (draggedActivity === collection.getLastKey() && deltaY > 0) {
			return '0px';
		}

		return `${deltaY}px`;
	}, [collection, deltaY, draggedActivity]);

	return (
		<div
			className={cx(
				'grow basis-5/12 border border-stone-700 rounded divide-stone-700 divide-y',
				className,
			)}
		>
			{Seq(collection).map(activity => (
				<div
					key={activity.key}
					className='relative'
					style={{
						height:
							draggedActivity === activity.key
								? `${activityReferences.get(activity.key)?.clientHeight ?? 0}px`
								: undefined,
					}}
				>
					<div
						ref={element => {
							if (element !== null) {
								setActivityReferences(current =>
									current.set(activity.key, element),
								);
							}
						}}
						className={cx(
							draggedActivity === activity.key &&
								'absolute z-10 bg-stone-900 w-full border-y border-stone-700',
							draggedActivity === undefined &&
								'hover:bg-stone-900',
							'flex items-center gap-4 rounded grow text-stone-200 p-2 group select-none left-0',
						)}
						style={{
							top:
								draggedActivity === activity.key
									? draggedActivityOffset
									: undefined,
						}}
					>
						<div
							draggable
							className='cursor-grab touch-none fill-stone-400'
							onTouchStart={touchStartHandler(activity.key)}
							onTouchMove={touchHandler(activity.key)}
							onTouchEnd={dragEndHandler}
							onDragStart={dragStartHandler(activity.key)}
							onDrag={dragHandler(activity.key)}
							onDragEnd={dragEndHandler}
						>
							<DragHandle />
						</div>

						{activity.rendered}
						<Spacer />
						<Button
							className='bg-transparent hover:bg-stone-700'
							variant='text'
							onPress={() => {
								onRemove(activity.key);
							}}
						>
							<Remove className='fill-current' />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
