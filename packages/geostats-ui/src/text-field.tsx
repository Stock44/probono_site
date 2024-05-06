import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import {type AriaTextFieldProps, useTextField} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {cx} from './cva.ts';

export type TextFieldProps = {
	readonly className?: string;
	readonly icon?: ReactNode;
} & AriaTextFieldProps;

export default forwardRef(function TextField(
	props: TextFieldProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const {label, isDisabled, className, description, icon, isRequired} = props;
	const inputRef = useObjectRef(ref);
	const {
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useTextField(
		{
			validationBehavior: 'native',
			...props,
		},
		inputRef,
	);

	return (
		<div data-disabled={isDisabled} className={cx('group', className)}>
			{label && (
				<label
					{...labelProps}
					className={cx(
						'text-stone-400 text-sm block mb-1 group-focus-within:text-stone-50 group-data-[disabled=true]:text-stone-500 transition-colors',
						isRequired && 'after:content-["*"] after:ml-0.5',
					)}
				>
					{label}
				</label>
			)}

			<div className='flex items-center gap-2 rounded border border-stone-700 px-2 shadow-stone-800 transition-all group-focus-within:border-stone-50 group-focus-within:glow-sm group-data-[disabled=true]:border-stone-800'>
				{icon}
				<input
					{...inputProps}
					ref={inputRef}
					className='min-w-0 grow bg-transparent py-2 text-stone-100 outline-none placeholder:text-stone-500 disabled:cursor-not-allowed disabled:text-stone-600'
				/>
			</div>
			{description === undefined ? null : (
				<div {...descriptionProps}>{description}</div>
			)}
			{isInvalid && (
				<div
					{...errorMessageProps}
					className='mt-1 text-xs text-red-400'
				>
					{validationErrors.join(' ')}
				</div>
			)}
		</div>
	);
});
