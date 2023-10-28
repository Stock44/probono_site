import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaTextFieldProps, useTextField} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {twJoin, twMerge} from 'tailwind-merge';
import Image, {type StaticImageData} from 'next/image';
import Icon from '@/components/icon.tsx';

export type TextFieldProps = {
	readonly className?: string;
	readonly icon?: string | StaticImageData;
} & AriaTextFieldProps;

export default forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {label, isDisabled, className, description, errorMessage, icon} = props;
	const inputRef = useObjectRef(ref);
	const {labelProps, inputProps, descriptionProps, errorMessageProps} = useTextField(props, inputRef);

	return (
		<div data-disabled={isDisabled} className={twMerge('group', className)}>
			<label {...labelProps} className='text-stone-300 text-sm block mb-1 group-focus-within:text-stone-50 group-data-[disabled=true]:text-stone-500'>{label}</label>
			<div className='border rounded border-stone-700 flex items-center px-1 gap-1 group-focus-within:border-stone-50 group-data-[disabled=true]:border-stone-800'>
				{
					icon !== undefined && typeof icon === 'string'
						? <Icon iconName={icon} className='text-stone-500 group-focus-within:text-stone-50'/>
						: null
				}
				{
					icon !== undefined && typeof icon === 'object'
						? <Image src={icon} alt={`${label?.toString()} icon`} width={16} height={16} className='brightness-50 group-focus-within:brightness-100'/>
						: null
				}
				<input {...inputProps} ref={inputRef} className='bg-transparent py-1 placeholder:text-stone-500 grow outline-none text-stone-200 disabled:text-stone-600 disabled:cursor-not-allowed'/>
			</div>
			{
				description === undefined
					? null
					: <div {...descriptionProps}>
						{description}
					</div>
			}
			{
				errorMessage === undefined
					? null
					: <div {...errorMessageProps}>
						{errorMessage}
					</div>
			}
		</div>
	);
});
