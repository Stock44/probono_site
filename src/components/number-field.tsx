import React from 'react';
import {
	type NumberInputProps,
	Unstable_NumberInput as BaseNumberInput,
} from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';
import {type AriaNumberFieldProps, useLocale, useNumberField} from 'react-aria';
import {type NumberFieldStateOptions, useNumberFieldState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {twJoin} from 'tailwind-merge';
import Image, {type StaticImageData} from 'next/image';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';
import {cx} from '@/lib/cva.ts';

export type NumberFieldProps = {
	readonly className?: string;
	readonly name?: string;
	readonly icon?: string | StaticImageData;
} & AriaNumberFieldProps & Omit<NumberFieldStateOptions, 'locale'>;

export const NumberField = React.forwardRef((
	props: NumberFieldProps,
	ref: React.ForwardedRef<HTMLInputElement>,
) => {
	const {locale} = useLocale();
	const {label, className, icon, isDisabled, name, isRequired} = props;
	const state = useNumberFieldState({
		validationBehavior: 'native',
		...props,
		locale,
	});
	const inputRef = useObjectRef(ref);
	const {
		labelProps,
		groupProps,
		inputProps,
		incrementButtonProps,
		decrementButtonProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useNumberField({
		validationBehavior: 'native',
		...props,
	}, state, inputRef);
	return (
		<div data-disabled={isDisabled} className={twJoin('group', className)}>
			<label
				{...labelProps} className={cx(
					'block text-stone-400 group-focus-within:text-stone-50 text-sm mb-1 group-data-[disabled=true]:text-stone-500',
					isRequired && 'after:content-["*"] after:ml-0.5',
				)}>{label}</label>

			<div {...groupProps} className='flex items-center justify-right pl-1 rounded border border-stone-700 group-focus-within:border-stone-50 w-full group-data-[disabled=true]:border-stone-800'>
				{
					icon !== undefined && typeof icon === 'string'
						? <Icon name={icon} className='text-stone-500 group-focus-within:text-stone-50 me-1 flex-none basis-4'/>
						: null
				}
				{
					icon !== undefined && typeof icon === 'object'
						? <Image src={icon} alt={`${label?.toString()} icon`} width={16} height={16} className='brightness-50 group-focus-within:brightness-100 me-1 flex-none basis-4'/>
						: null
				}
				<input {...inputProps} ref={inputRef} name={name} className='bg-transparent text-stone-200 py-1 outline-none grow min-w-0 disabled:text-stone-600 disabled:cursor-not-allowed'/>
				<div className='flex-none basis-4'>
					<Button {...incrementButtonProps} variant='text' size='xs'>
						<Icon name='arrow_drop_up'/>
					</Button>
					<Button {...decrementButtonProps} variant='text' size='xs'>
						<Icon name='arrow_drop_down'/>
					</Button>
				</div>
			</div>
			{
				isInvalid && <div {...errorMessageProps} className='text-red-400 mt-1 text-xs'>
					{validationErrors.join(' ')}
				</div>
			}
		</div>
	);
});
