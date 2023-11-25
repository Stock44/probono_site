import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaSearchFieldProps, useSearchField} from 'react-aria';
import {type SearchFieldProps as SearchFieldStateProps, useSearchFieldState} from 'react-stately';
import {useObjectRef} from '@react-aria/utils';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import {cx} from '@/lib/cva.ts';

export type SearchFieldProps = {
	readonly className: string;
} & AriaSearchFieldProps & SearchFieldStateProps;

export default forwardRef((props: SearchFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {label, className} = props;
	const state = useSearchFieldState(props);
	const inputRef = useObjectRef(ref);
	const {labelProps, inputProps, clearButtonProps} = useSearchField(props, state, inputRef);

	return (
		<div className={cx('group', className)}>
			<label {...labelProps} className='text-stone-300 group-focus-within:text-stone-50'>{label}</label>
			<div className='flex rounded border border-stone-700 items-center px-1 group-focus-within:border-stone-50 gap-1'>
				<Icon name='search' className='text-stone-500 group-focus-within:text-stone-50'/>
				<input {...inputProps} ref={inputRef} className='py-1 grow text-stone-200 bg-transparent outline-none'/>
				{
					state.value === ''
						? null
						: <Button {...clearButtonProps} variant='text'>
							<Icon name='close'/>
						</Button>
				}

			</div>
		</div>
	);
});
