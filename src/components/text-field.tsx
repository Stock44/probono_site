import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaTextFieldProps, useTextField} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {twJoin, twMerge} from 'tailwind-merge';
import Image, {type StaticImageData} from 'next/image';
import Icon from '@/components/icon.tsx';
import {cx} from '@/lib/cva.ts';

export type TextFieldProps = {
	readonly className?: string;
	readonly icon?: string | StaticImageData;
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
		<div data-disabled={isDisabled} className={twMerge('group', className)}>
			<label
				{...labelProps} className={cx(
					'text-stone-400 text-sm block mb-1 group-focus-within:text-stone-50 group-data-[disabled=true]:text-stone-500',
					isRequired && 'after:content-["*"] after:ml-0.5',
				)}>{label}</label>
			<div className='border rounded border-stone-700 flex items-center px-1 gap-1 group-focus-within:border-stone-50 group-data-[disabled=true]:border-stone-800'>
				{
					icon !== undefined && typeof icon === 'string'
						? <Icon iconName={icon} className='text-stone-500 group-focus-within:text-stone-50'/>
						: null
				}
				{
					icon !== undefined && typeof icon === 'object'
						? <Image src={icon} alt={`${label?.toString()} icon`} width={16} height={16} className='brightness-50 w-4 h-auto group-focus-within:brightness-100'/>
						: null
				}
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
