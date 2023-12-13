import React, {useRef} from 'react';
import {type AriaSearchFieldProps, useSearchField} from 'react-aria';
import {type SearchFieldProps as SearchFieldStateProps, useSearchFieldState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import Search from '@material-design-icons/svg/round/search.svg';
import Close from '@material-design-icons/svg/round/close.svg';
import Button from '@/components/button.tsx';
import {cx} from '@/lib/cva.ts';

export type SearchFieldProps = {
	readonly className: string;
} & AriaSearchFieldProps & SearchFieldStateProps;

export default function SearchField(props: SearchFieldProps) {
	const {label, className} = props;
	const state = useSearchFieldState(props);
	const inputRef = useRef<HTMLInputElement>(null);
	const {labelProps, inputProps, clearButtonProps} = useSearchField(props, state, inputRef);

	return (
		<div className={cx('group', className)}>
			<label {...labelProps} className='text-stone-300 group-focus-within:text-stone-50'>{label}</label>
			<div
				className='flex rounded border border-stone-700 items-center px-1 group-focus-within:border-stone-50 gap-1'>
				<Search className='fill-stone-500 group-focus-within:fill-stone-50'/>
				<input {...inputProps} ref={inputRef} className='py-1 grow text-stone-200 bg-transparent outline-none'/>
				{
					state.value === ''
						? null
						: <Button {...clearButtonProps} variant='text'>
							<Close/>
						</Button>
				}

			</div>
		</div>
	);
}
