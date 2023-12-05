import React, {type ForwardedRef, forwardRef, type ReactNode} from 'react';
import {type AriaButtonOptions, useButton} from 'react-aria';
import {useObjectRef} from '@react-aria/utils';
import {type VariantProps} from '@/lib/cva.ts';
import buttonVariant from '@/components/variants/button.tsx';

export type ButtonProps = {
	readonly children?: ReactNode;
	readonly className?: string;
} & AriaButtonOptions<'button'> & VariantProps<typeof buttonVariant>;

export default forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {children} = props;
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton(props, buttonRef);
	return (
		<button
			{...buttonProps}
			ref={buttonRef}
			className={buttonVariant(props)}
		>{children}</button>
	);
});
