import React, {type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GeoStatsLogo from 'public/logos/geostats.png';
import GeoStatsLogoMark from 'public/logos/geostats-logomark.png';
import FacebookLogo from 'public/logos/facebook.png';
import InstagramLogo from 'public/logos/instagram.png';
import LinkedinLogo from 'public/logos/linkedin.png';
import SocialLink from 'geostats-ui/social-link.tsx';

export type TopBarFooterLayoutProps = {
	readonly children: ReactNode;
	readonly topBarItems: ReactNode;
};

export default function TopBarFooterLayout(props: TopBarFooterLayoutProps) {
	const {children, topBarItems} = props;
	return (
		<div className='min-h-screen min-w-full border-b'>
			<header className='h-16 w-full border-b border-stone-800 px-4'>
				<div className='mx-auto flex h-full max-w-7xl items-center gap-2'>
					<Link
						href='/'
						className='flex items-center gap-2 font-bold text-stone-50'
					>
						<Image
							src={GeoStatsLogoMark}
							height={28}
							className='mx-auto my-4'
							alt='geostats logo'
						/>
						[GeoStats]
					</Link>
					<div className='grow' />
					{topBarItems}
				</div>
			</header>
			<div className='min-h-[calc(100vh-theme(spacing.16))] px-4 pb-32 pt-8'>
				{children}
			</div>
			<footer className='border-t border-stone-800 px-4'>
				<div className='mx-auto max-w-7xl'>
					<Link
						href='/'
						className='mx-auto my-8 block w-fit items-center font-semibold text-stone-50'
					>
						<Image
							src={GeoStatsLogo}
							height={64}
							className='mx-auto my-4'
							alt='geostats logo'
						/>
					</Link>

					<div className='mx-auto mb-8 flex w-fit items-center gap-16'>
						<SocialLink
							image={FacebookLogo}
							name='Facebook'
							href='https://www.facebook.com/geostatslabnl'
						/>
						<SocialLink
							image={InstagramLogo}
							name='Instagram'
							href='https://www.instagram.com/geostats.mty/'
						/>
						<SocialLink
							image={LinkedinLogo}
							name='Linkedin'
							href='https://www.linkedin.com/company/geo-stats/'
						/>
					</div>
					<div className='mx-auto mb-8 flex w-fit items-center gap-16'>
						<p className='text-stone-400'>
							© 2023 GeoStats (o quien sea, TODO)
						</p>
						<Link
							href='/terms'
							className='text-stone-400 hover:text-stone-300'
						>
							Terminos y condiciones
						</Link>
						<Link
							href='/privacy-policy'
							className='text-stone-400 hover:text-stone-300'
						>
							Política de privacidad
						</Link>
					</div>
				</div>
			</footer>
			<div />
		</div>
	);
}
