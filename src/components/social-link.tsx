import React from 'react';
import Image, {type StaticImageData} from 'next/image';

export type SocialLinkProps = {
	readonly image: StaticImageData;
	readonly name: string;
	readonly href: string;
};
export default function SocialLink(props: SocialLinkProps) {
	const {image, href, name} = props;
	return (
		<a href={href}>
			<Image src={image} alt={name} height={24} width={24}/>
		</a>
	);
}
