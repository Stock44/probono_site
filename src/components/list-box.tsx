import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaListBoxProps, mergeProps, useFocusRing, useListBox, useListBoxSection, useOption} from 'react-aria';
import {type Node} from '@react-types/shared';
import {type ListProps, type ListState, useListState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {twMerge} from 'tailwind-merge';
import {cx} from '@/lib/cva.ts';

export type ListBoxProps<T extends Record<string, unknown>> = StatefulListBoxProps<T> | BaseListBoxProps<T>;

export default function ListBox<T extends Record<string, unknown>>(props: ListBoxProps<T>) {
	return 'state' in props ? <BaseListBox {...props}/> : <StatefulListBox {...props}/>;
}

type StatefulListBoxProps<T extends Record<string, unknown>> = ListProps<T> & Omit<BaseListBoxProps<T>, 'state'>;

const StatefulListBox = forwardRef(<T extends Record<string, unknown>>(props: StatefulListBoxProps<T>, ref: ForwardedRef<HTMLUListElement>) => {
	const state = useListState<T>(props);

	return <BaseListBox {...props} ref={ref} state={state}/>;
});

export type BaseListBoxProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly state: ListState<T>;
} & AriaListBoxProps<T>;

export const BaseListBox = forwardRef(<T extends Record<string, unknown>>(props: BaseListBoxProps<T>, ref: ForwardedRef<HTMLUListElement>) => {
	const {label, state, className} = props;

	const listBoxRef = useObjectRef(ref);
	const {listBoxProps, labelProps} = useListBox<T>(props, state, listBoxRef);

	return (
		<>
			{label ? <label {...labelProps} className='text-stone-200 text-xl mb-2 block px-2'>{label}</label> : null}

			<ul
				{...listBoxProps} ref={listBoxRef}
				className={twMerge('rounded overflow-y-auto scroll-smooth scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbar-thin scrollbar-thumb-rounded', className)}>
				{[...state.collection].map(item => (
					item.type === 'section'
						? <ListBoxSection key={item.key} section={item} state={state}/>
						: <Option key={item.key} item={item} state={state}/>
				))}
			</ul>
		</>
	);
});

export type ListBoxSectionProps<T> = {
	readonly section: Node<T>;
	readonly state: ListState<T>;
};

function ListBoxSection<T extends Record<string, unknown>>(props: ListBoxSectionProps<T>) {
	const {section, state} = props;

	const {itemProps, headingProps, groupProps} = useListBoxSection({
		heading: section.rendered,
		'aria-label': section['aria-label'],
	});
	// If the section is not the first, add a separator element to provide visual separation.
	// The heading is rendered inside an <li> element, which contains
	// a <ul> with the child items.
	return (
		<li {...itemProps} className='p-2'>
			{section.rendered
							&& (
								<div
									{...headingProps}
									className={cx('font-semibold py-2 text-sm text-stone-200 top-0',
										section.key !== state.collection.getFirstKey() && 'mt-2')}
								>
									{section.rendered}
								</div>
							)}
			<ul
				{...groupProps}
			>
				{[...state.collection.getChildren!(section.key)].map(node => (
					<Option
						key={node.key}
						item={node}
						state={state}
					/>
				))}
			</ul>
		</li>
	);
}

export type OptionProps<T extends Record<string, unknown>> = {
	readonly item: Node<T>;
	readonly state: ListState<T>;
};

function Option<T extends Record<string, unknown>>(props: OptionProps<T>) {
	const {item, state} = props;

	// Get props for the option element
	const ref = React.useRef(null);
	const {isSelected, optionProps, isFocused} = useOption({key: item.key}, state, ref);

	// Determine whether we should show a keyboard
	// focus ring for accessibility
	const {isFocusVisible, focusProps} = useFocusRing();

	return (
		<li
			{...mergeProps(optionProps, focusProps)}
			ref={ref}
			className={cx('text-stone-300 p-2 border rounded border-transparent outline-none cursor-pointer data-[focus-visible=true]:border-stone-50',
				isSelected && 'bg-stone-50 text-stone-800',
				!isSelected && 'hover:bg-stone-800',
				isFocused && !isSelected && 'bg-stone-900')}
			data-focus-visible={isFocusVisible}
		>
			{item.rendered}
		</li>
	);
}

