'use client';
import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {type VariantProps} from '@/lib/cva.ts';
import buttonVariant from '@/components/button/button-variants.tsx';

export type ButtonProps = {
	readonly children?: ReactNode;
	readonly className?: string;
} & AriaButtonOptions<'button'> & VariantProps<typeof buttonVariant>;

export default forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {children} = props;
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton({
		...props,
		// Workaround for react/react-aria #1513
		onPress(event) {
			if (event.pointerType === 'mouse' || event.pointerType === 'keyboard') {
				props.onPress?.(event);
				return;
			}

			setTimeout(() => {
				props.onPress?.(event);
			}, 1);
		},
	}, buttonRef);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={buttonVariant(props)}
		>{children}</button>
	);
});
