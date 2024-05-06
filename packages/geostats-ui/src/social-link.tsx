import React from 'react';
import Image, {type StaticImageData} from 'next/image';
import {cx} from '@/cva.ts';

export type SocialLinkProps = {
	readonly image: StaticImageData;
	readonly name: string;
	readonly href: string;
	readonly size?: number;
	readonly className?: string;
};
export default function SocialLink(props: SocialLinkProps) {
	const {image, href, name, className, size = 24} = props;
	return (
		<a
			href={href}
			className={cx('flex justify-center items-center', className)}
			target='_blank'
			rel='noreferrer'
		>
			<Image src={image} alt={name} height={size} width={size} />
		</a>
	);
}
