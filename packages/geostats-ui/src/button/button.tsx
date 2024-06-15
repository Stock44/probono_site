'use client';
import React, {type ReactNode, type RefObject} from 'react';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {type VariantProps} from '@/cva.ts';
import {buttonVariants} from '@/button/button-variants.tsx';

export type ButtonProps = {
	readonly children?: ReactNode;
	readonly className?: string;
	readonly buttonRef?: RefObject<HTMLButtonElement>;
} & AriaButtonOptions<'button'> &
	VariantProps<typeof buttonVariants>;

export function Button(props: ButtonProps) {
	const {children, buttonRef} = props;
	const ref = useObjectRef<HTMLButtonElement>(buttonRef);
	const {buttonProps} = useButton(
		{
			...props,
			// Workaround for react/react-aria #1513
			onPress(event) {
				if (
					event.pointerType === 'mouse' ||
					event.pointerType === 'keyboard'
				) {
					props.onPress?.(event);
					return;
				}

				setTimeout(() => {
					props.onPress?.(event);
				}, 1);
			},
		},
		ref,
	);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={buttonVariants(props)}
		>
			{children}
		</button>
	);
}
