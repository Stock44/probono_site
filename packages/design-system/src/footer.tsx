import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GeoStatsLogo from 'public/logos/geostats.png';
import FacebookLogo from 'public/logos/facebook.png';
import InstagramLogo from 'public/logos/instagram.png';
import LinkedinLogo from 'public/logos/linkedin.png';
import SocialLink from '@/components/social-link.tsx';

export default function Footer() {
	return (
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
				<div className='flex items-center gap-4 lg:gap-16 mx-auto w-fit mb-8 flex-col lg:flex-row'>
					<p className='text-stone-400'>© 2024 GeoStats</p>
					<Link href='/terms' className='text-stone-400 hover:text-stone-300'>Terminos y condiciones</Link>
					<Link href='/privacy-policy' className='text-stone-400 hover:text-stone-300'>Política de privacidad</Link>
				</div>
			</div>

		</footer>
	);
}
