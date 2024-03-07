import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import {type AriaTextFieldProps, useTextField} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {cx} from '@/lib/cva.ts';

export type TextFieldProps = {
	readonly className?: string;
	readonly icon?: ReactNode;
} & AriaTextFieldProps;

export default forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {label, isDisabled, className, description, icon, isRequired} = props;
	const inputRef = useObjectRef(ref);
	const {
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useTextField({
		validationBehavior: 'native',
		...props,
	}, inputRef);

	return (
		<div data-disabled={isDisabled} className={cx('group', className)}>
			{
				label && (
					<label
						{...labelProps} className={cx(
							'text-stone-400 text-sm block mb-1 group-focus-within:text-stone-50 group-data-[disabled=true]:text-stone-500',
							isRequired && 'after:content-["*"] after:ml-0.5',
						)}>{label}</label>
				)
			}

			<div
				className='border rounded border-stone-700 flex items-center px-1 gap-1 group-focus-within:border-stone-50 group-data-[disabled=true]:border-stone-800'>
				{icon}
				<input {...inputProps} ref={inputRef} className='bg-transparent py-1 placeholder:text-stone-500 grow outline-none text-stone-100 disabled:text-stone-600 disabled:cursor-not-allowed'/>
			</div>
			{
				description === undefined
					? null
					: <div {...descriptionProps}>
						{description}
					</div>
			}
			{
				isInvalid && <div {...errorMessageProps} className='text-red-400 mt-1 text-xs'>
					{validationErrors.join(' ')}
				</div>
			}
		</div>
	);
});
