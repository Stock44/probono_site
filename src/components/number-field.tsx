import React, {type ReactNode} from 'react';
import {type AriaNumberFieldProps, useLocale, useNumberField} from 'react-aria';
import {type NumberFieldStateOptions, useNumberFieldState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {twJoin} from 'tailwind-merge';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import ArrowDropUp from '@material-design-icons/svg/round/arrow_drop_up.svg';
import Button from '@/components/button.tsx';
import {cx} from '@/lib/cva.ts';

export type NumberFieldProps = {
	readonly className?: string;
	readonly name?: string;
	readonly icon?: ReactNode;
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

			<div {...groupProps} className='flex items-center justify-right px-1 gap-1 rounded border border-stone-700 group-focus-within:border-stone-50 w-full group-data-[disabled=true]:border-stone-800'>
				{icon}
				<input {...inputProps} ref={inputRef} name={name} className='bg-transparent text-stone-200 py-1 outline-none grow min-w-0 disabled:text-stone-600 disabled:cursor-not-allowed'/>
				<div className='flex-none flex-col justify-around items-center basis-4 fill-stone-400'>
					<Button {...incrementButtonProps} variant='text' size='xs'>
						<ArrowDropUp className='w-4 h-4'/>
					</Button>
					<Button {...decrementButtonProps} variant='text' size='xs'>
						<ArrowDropDown className='w-4 h-4'/>
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
