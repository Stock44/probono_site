'use client';
import React from 'react';
import {
	Select as BaseSelect,
	type SelectOwnerState,
	type SelectProps,
} from '@mui/base/Select';
import {Option as BaseOption} from '@mui/base/Option';
import clsx from 'clsx';

const SelectButton = React.forwardRef(<
	Multiple extends boolean,
>(
	{
		ownerState,
		children,
		...props
	}: {
		readonly values?: string[];
		readonly labels?: string[];
		readonly ownerState: SelectOwnerState<string | number, Multiple>;
	} & React.ComponentProps<'button'>,
	ref: React.ForwardedRef<HTMLButtonElement>,
) => (
	<button {...props} ref={ref}>
		{children}
		<span className='material-symbols-rounded'>
			{ownerState.open ? 'arrow_drop_up' : 'arrow_drop_down'}
		</span>
	</button>
));

export const LabeledSelect = React.forwardRef(<

	Multiple extends boolean,
>(
	{
		label,
		required,
		values,
		labels,
		children,
		slotProps,
		className,
		...props
	}: {
		readonly label: string;
		readonly values: Array<string | number>;
		readonly labels?: string[];
	} & SelectProps<string | number, Multiple>,
	ref: React.ForwardedRef<HTMLButtonElement>,
) => {
	const actualValues = required === true ? values : [null, ...values];
	const actualLabels = required ? [props.placeholder, ...(labels ?? [])] : labels;

	return (
		<label className={clsx('mb-4 block', className)}>
			<p className='text-stone-300 text-xs pb-1'>
				{label}
				{required === true ? '*' : null}
			</p>
			<BaseSelect<string | number, Multiple>
				{...props}
				ref={ref}
				required={required}
				slots={{
					root: SelectButton,
				}}
				slotProps={{
					...slotProps,
					root: {
						className:
              'rounded flex justify-between p-1 w-full text-sm border border-stone-700 text-stone-300',
					},
					popper: {
						className: 'shadow-md',
					},
					listbox: {
						className: 'rounded bg-stone-800 mt-2 border-stone-600 border',
					},
				}}
			>
				{actualValues.map((value, idx) => (
					<BaseOption
						key={value}
						value={value}
						slotProps={{
							root: {
								className:
                  'hover:bg-stone-600 hover:text-stone-100 p-1 text-stone-200',
							},
						}}
					>
						{actualLabels === undefined ? value : actualLabels[idx]}
					</BaseOption>
				))}
			</BaseSelect>
		</label>
	);
});
