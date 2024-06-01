import React, {useRef} from 'react';
import {type AriaSearchFieldProps, useSearchField} from 'react-aria';
import {
	type SearchFieldProps as SearchFieldStateProps,
	useSearchFieldState,
} from 'react-stately';
import Search from '@material-design-icons/svg/round/search.svg';
import Close from '@material-design-icons/svg/round/close.svg';
import {Button} from './button/button.tsx';
import {cx} from './cva.ts';

export type SearchFieldProps = {
	readonly className: string;
} & AriaSearchFieldProps &
	SearchFieldStateProps;

export function SearchField(props: SearchFieldProps) {
	const {label, className} = props;
	const state = useSearchFieldState(props);
	const inputRef = useRef<HTMLInputElement>(null);
	const {labelProps, inputProps, clearButtonProps} = useSearchField(
		props,
		state,
		inputRef,
	);

	return (
		<div className={cx('group', className)}>
			<label
				{...labelProps}
				className='text-stone-300 group-focus-within:text-stone-50'
			>
				{label}
			</label>
			<div className='flex items-center gap-1 rounded border border-stone-700 px-1 group-focus-within:border-stone-50'>
				<Search className='fill-stone-500 group-focus-within:fill-stone-50' />
				<input
					{...inputProps}
					ref={inputRef}
					className='grow bg-transparent py-1 text-stone-200 outline-none'
				/>
				{state.value === '' ? null : (
					<Button {...clearButtonProps} variant='text'>
						<Close />
					</Button>
				)}
			</div>
		</div>
	);
}
