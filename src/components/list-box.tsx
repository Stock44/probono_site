import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaListBoxProps, mergeProps, useFocusRing, useListBox, useListBoxSection, useOption} from 'react-aria';
import {type Node} from '@react-types/shared';
import {type ListState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import clsx from 'clsx';

export type ListBoxProps<T extends Record<string, unknown>> = {
	readonly className?: string;
	readonly state: ListState<T>;
} & AriaListBoxProps<T>;

// TODO currently only works in inner mode (with a passed in state), implementation of standalone mode needed
export default forwardRef(<T extends Record<string, unknown>>(props: ListBoxProps<T>, ref: ForwardedRef<HTMLUListElement>) => {
	const {label, state, className} = props;

	const listBoxRef = useObjectRef(ref);
	const {listBoxProps, labelProps} = useListBox<T>(props, state, listBoxRef);

	return (
		<>
			{label ? <label {...labelProps} className='text-stone-400 p-2'>{label}</label> : null}

			<ul
				{...listBoxProps} ref={listBoxRef}
				className={clsx('rounded overflow-y-scroll scroll-smooth scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbar-thin scrollbar-thumb-rounded', className)}>
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
		<>
			{section.key !== state.collection.getFirstKey()
						&& (
							<li
								role='presentation'

							/>
						)}
			<li {...itemProps}>
				{section.rendered
							&& (
								<span
									{...headingProps}>
									{section.rendered}
								</span>
							)}
				<ul
					{...groupProps}
					style={{
						padding: 0,
						listStyle: 'none',
					}}
				>
					{[...section.childNodes].map(node => (
						<Option
							key={node.key}
							item={node}
							state={state}
						/>
					))}
				</ul>
			</li>
		</>
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
			className={clsx('text-stone-300 p-1 rounded',
				isSelected && 'bg-stone-50 text-stone-800',
				isFocused && 'bg-stone-50 text-stone-800')}
			data-focus-visible={isFocusVisible}
		>
			{item.rendered}
		</li>
	);
}
