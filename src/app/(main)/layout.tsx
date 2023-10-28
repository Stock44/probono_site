import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/logomark.png';
import FacebookLogo from 'public/facebook-logo.png';
import LinkedinLogo from 'public/linkedin-logo.png';
import InstagramLogo from 'public/instagram-logo.png';
import SocialLink from '@/components/social-link.tsx';
import UserWidget from '@/components/user-widget.tsx';

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen min-w-full mx-auto'>
			<header className=' w-full static h-16 border-b border-stone-800 px-4'>
				<div className='max-w-7xl mx-auto h-full items-center flex gap-2 px-4'>
					<Link href='/' className='text-stone-50 font-semibold items-center'>
						<Image
							src={Logo}
							height={24}
							className='inline me-2'
							alt='geostats logo'
						/>
						<p className='inline'>[GeoStats]</p>
					</Link>
					<div className='grow'/>
					<UserWidget/>
				</div>
			</header>
			<div className='max-w-7xl mx-auto px-4 min-h-[calc(100vh-64px)] pb-32 flex flex-col'>{children}</div>
			<footer className='border-t border-stone-800'>
				<div className='max-w-7xl px-4 mx-auto'>
					<Link href='/' className='text-stone-50 font-semibold items-center w-fit mx-auto block mt-8 mb-8'>
						<Image
							src={Logo}
							height={64}
							className='mx-auto my-4'
							alt='geostats logo'
						/>
						<p className='text-3xl w-fit'>[GeoStats]</p>
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
