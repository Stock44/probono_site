import * as react_jsx_runtime from 'react/jsx-runtime';
import { StaticImageData } from 'next/image';

type SocialLinkProps = {
    readonly image: StaticImageData;
    readonly name: string;
    readonly href: string;
    readonly size?: number;
    readonly className?: string;
};
declare function SocialLink(props: SocialLinkProps): react_jsx_runtime.JSX.Element;

export { type SocialLinkProps, SocialLink as default };
