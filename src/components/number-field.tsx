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

export type NumberFieldProps = {
	readonly className?: string;
	readonly icon?: string | StaticImageData;
} & AriaNumberFieldProps & Omit<NumberFieldStateOptions, 'locale'>;

export const NumberField = React.forwardRef((
	props: NumberFieldProps,
	ref: React.ForwardedRef<HTMLInputElement>,
) => {
	const {locale} = useLocale();
	const {label, className, icon} = props;
	const state = useNumberFieldState({
		...props,
		locale,
	});
	const inputRef = useObjectRef(ref);
	const {labelProps, groupProps, inputProps, incrementButtonProps, decrementButtonProps} = useNumberField(props, state, inputRef);
	return (
		<div className={twJoin('group', className)}>
			<label {...labelProps} className='text-stone-300 group-focus-within:text-stone-50 text-sm'>{label}</label>
			<div {...groupProps} className='flex items-center pl-1 rounded border border-stone-700 group-focus-within:border-stone-50'>
				{
					icon !== undefined && typeof icon === 'string'
						? <Icon iconName={icon} className='text-stone-500 group-focus-within:text-stone-50 me-1'/>
						: null
				}
				{
					icon !== undefined && typeof icon === 'object'
						? <Image src={icon} alt={`${label?.toString()} icon`} width={16} height={16} className='brightness-50 group-focus-within:brightness-100 me-1'/>
						: null
				}
				<input {...inputProps} ref={inputRef} className='bg-transparent text-stone-200 py-1 outline-none autofill:bg-none'/>
				<div>
					<Button {...incrementButtonProps} variant='text' size='xs'>
						<Icon iconName='arrow_drop_up'/>
					</Button>
					<Button {...decrementButtonProps} variant='text' size='xs'>
						<Icon iconName='arrow_drop_down'/>
					</Button>
				</div>
			</div>
		</div>
	);
});
