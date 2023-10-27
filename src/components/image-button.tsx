import React, {type ForwardedRef, forwardRef} from 'react';
import {type AriaButtonProps, useButton} from 'react-aria';
import Image, {type ImageProps} from 'next/image';
import {useObjectRef} from '@react-aria/utils';
import clsx from 'clsx';

export type ImageButtonProps = {
	readonly className?: string;
} & Omit<AriaButtonProps, 'elementType'> & Pick<ImageProps, 'src' | 'alt' | 'height' | 'width'>;

export default forwardRef((props: ImageButtonProps, ref: ForwardedRef<HTMLImageElement>) => {
	const {className, src, alt, height, width} = props;
	const buttonRef = useObjectRef(ref);
	const {buttonProps} = useButton({
		...props,
		elementType: 'img',
	}, buttonRef);
	return <Image {...buttonProps} ref={buttonRef} width={width} height={height} src={src} alt={alt} className={clsx('hover:brightness-75', className)}/>;
});
