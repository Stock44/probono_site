import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaButtonProps, useButton} from 'react-aria';
import Image, {type ImageProps} from 'next/image';
import {useObjectRef} from '@react-aria/utils';
import {cx} from '@/lib/cva.ts';

export type ImageButtonProps = {
	readonly className?: string;
} & Omit<AriaButtonProps, 'elementType'> & Pick<ImageProps, 'src' | 'alt'>;

export default forwardRef((props: ImageButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {className, src, alt} = props;
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton({
		...props,
	}, buttonRef);
	return (
		<button {...buttonProps} ref={buttonRef} className={cx('hover:brightness-75 rounded relative', className)}>
			<Image fill src={src} alt={alt} objectFit='contain'/>
		</button>
	);
});
