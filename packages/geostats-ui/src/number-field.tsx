import {type ReactNode, type RefObject} from 'react';
import {type AriaNumberFieldProps, useLocale, useNumberField} from 'react-aria';
import {type NumberFieldStateOptions, useNumberFieldState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import {twJoin} from 'tailwind-merge';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import ArrowDropUp from '@material-design-icons/svg/round/arrow_drop_up.svg';
import {Button} from '@/button/button.tsx';
import {cx} from '@/cva.ts';

export type NumberFieldProps = {
	readonly className?: string;
	readonly name?: string;
	readonly icon?: ReactNode;
	readonly inputRef?: RefObject<HTMLInputElement>;
} & AriaNumberFieldProps &
	Omit<NumberFieldStateOptions, 'locale'>;

export function NumberField(props: NumberFieldProps) {
	const {locale} = useLocale();
	const {label, className, icon, isDisabled, name, isRequired} = props;
	const state = useNumberFieldState({
		validationBehavior: 'native',
		...props,
		locale,
	});
	const inputRef = useObjectRef(props.inputRef);
	const {
		labelProps,
		groupProps,
		inputProps,
		incrementButtonProps,
		decrementButtonProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useNumberField(
		{
			validationBehavior: 'native',
			...props,
		},
		state,
		inputRef,
	);
	return (
		<div data-disabled={isDisabled} className={twJoin('group', className)}>
			<label
				{...labelProps}
				className={cx(
					'block text-stone-400 group-focus-within:text-stone-50 text-sm mb-1 group-data-[disabled=true]:text-stone-500 transition-colors',
					isRequired && 'after:content-["*"] after:ml-0.5',
				)}
			>
				{label}
			</label>

			<div
				{...groupProps}
				className='flex w-full items-center gap-2 rounded border border-stone-700 ps-2 shadow-stone-800 transition-all group-focus-within:border-stone-50 group-focus-within:glow-sm group-data-[disabled=true]:border-stone-800'
			>
				{icon}
				<input
					{...inputProps}
					ref={inputRef}
					name={name}
					className='min-w-0 grow bg-transparent py-2 text-stone-200 outline-none disabled:cursor-not-allowed disabled:text-stone-600'
				/>
				<div className='flex-none basis-4 flex-col items-center justify-around fill-stone-400'>
					<Button {...incrementButtonProps} variant='text' size='xs'>
						<ArrowDropUp viewBox='0 0 24 24' className='size-4' />
					</Button>
					<Button {...decrementButtonProps} variant='text' size='xs'>
						<ArrowDropDown viewBox='0 0 24 24' className='size-4' />
					</Button>
				</div>
			</div>
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
}
