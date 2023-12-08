import React, {type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GeoStatsLogo from '@/images/logos/geostats.png';
import GeoStatsLogoMark from '@/images/logos/geostats-logomark.png';
import FacebookLogo from '@/images/logos/facebook.png';
import InstagramLogo from '@/images/logos/instagram.png';
import LinkedinLogo from '@/images/logos/linkedin.png';
import SocialLink from '@/components/social-link.tsx';

export type TopBarFooterLayoutProps = {
	readonly children: ReactNode;
	readonly topBarItems: ReactNode;
};

export default function TopBarFooterLayout(props: TopBarFooterLayoutProps) {
	const {children, topBarItems} = props;
	return (
		<div className='min-h-screen min-w-full'>
			<header className='w-full h-16 border-b border-stone-800 px-4'>
				<div className='max-w-7xl mx-auto h-full items-center flex gap-2'>
					<Link href='/' className='flex items-center gap-2 text-md font-bold text-stone-50'>
						<Image
							src={GeoStatsLogoMark}
							height={28}
							className='mx-auto my-4'
							alt='geostats logo'
						/>
						[GeoStats]
					</Link>
					<div className='grow'/>
					{topBarItems}
				</div>
			</header>
			<div className='min-h-[calc(100vh-theme(spacing.16))] pb-32 pt-8 px-4'>{children}</div>
			<footer className='border-t border-stone-800 px-4'>
				<div className='max-w-7xl mx-auto'>
					<Link href='/' className='text-stone-50 font-semibold items-center w-fit mx-auto block mt-8 mb-8'>
						<Image
							src={GeoStatsLogo}
							height={64}
							className='mx-auto my-4'
							alt='geostats logo'
						/>
					</Link>

					<div className='flex items-center gap-16 mx-auto w-fit mb-8'>
						<SocialLink image={FacebookLogo} name='Facebook' href='https://www.facebook.com/geostatslabnl'/>
						<SocialLink image={InstagramLogo} name='Instagram' href='https://www.instagram.com/geostats.mty/'/>
						<SocialLink image={LinkedinLogo} name='Linkedin' href='https://www.linkedin.com/company/geo-stats/'/>
					</div>
					<div className='flex items-center gap-16 mx-auto w-fit mb-8'>
						<p className='text-stone-400'>© 2023 GeoStats (o quien sea, TODO)</p>
						<Link href='/terms' className='text-stone-400 hover:text-stone-300'>Terminos y condiciones</Link>
						<Link href='/privacy-policy' className='text-stone-400 hover:text-stone-300'>Política de privacidad</Link>
					</div>
				</div>

			</footer>
			<div/>
		</div>
	);
}
