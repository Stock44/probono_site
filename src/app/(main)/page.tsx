import React from 'react';
import Image, {getImageProps} from 'next/image';
import GeoStatsLogoMark from 'public/logos/geostats-logomark.png';
import ProBonoLogo from 'public/logos/probono.png';
import labnl from '@/app/(main)/labnl_vignette.webp';
import labnl_mobile from '@/app/(main)/labnl_vignette_mobile.webp';
import map from '@/app/(main)/map.jpg';
import Dropdown from '@/components/dropdown.tsx';
import ALinkButton from '@/components/a-link-button.tsx';

export default function Home() {
	const common = {alt: 'LabNL', sizes: '100vw'};
	const {
		props: {srcSet: desktop},
	} = getImageProps({
		...common,
		width: 1600,
		height: 800,
		src: labnl,
	});
	const {
		props: {srcSet: mobile, ...rest},
	} = getImageProps({
		...common,
		width: 750,
		height: 1334,
		src: labnl_mobile,
	});

	return (
		<div className='w-full'>
			<div className='relative flex flex-col justify-center w-full mx-auto mb-48'>
				<picture
					className='min-h-[500px] h-[500px] lg:min-h-[800px] lg:h-[800px] overflow-hidden w-auto flex justify-center'>
					<source media='(min-width: 1024px)' srcSet={desktop}/>
					<source srcSet={mobile}/>
					<img {...rest} className='h-full w-auto max-w-none'/>
				</picture>

				<div
					className='lg:absolute lg:top-0 lg:bottom-0 lg:left-0 lg:right-0 -mt-16 lg:mt-0 text-stone-50  lg:z-10 flex flex-col justify-end lg:justify-center px-4 text-center lg:text-left'>
					<div className='w-full max-w-7xl mx-auto'>
						<div className='lg:ml-32 max-w-xl mx-auto lg:mx-0'>
							<h1 className='font-bold text-3xl lg:text-5xl mb-6 mx-auto lg:mx-0'>Empodera a tu organización Pro
								Bono</h1>
							<p className='text-base mb-6 mx-auto lg:mx-0'>Únete a nuestra plataforma y muestra el impacto que tiene tu
								organización.</p>
							<ALinkButton href='/api/auth/signup?returnTo=/my' className='mx-auto lg:mx-0' size='lg'>
								Regístrate ahora
							</ALinkButton>
						</div>

					</div>

				</div>
			</div>
			<div className='max-w-7xl mx-auto text-stone-300 px-2'>
				<h2 className='text-stone-50 mx-auto w-fit text-center font-bold text-3xl mb-12'>
					¿Quiénes somos?
				</h2>
				<div className='mx-auto mb-48 w-fit'>

					<div className='flex justify-center gap-16 px-4'>
						<Image src={GeoStatsLogoMark} alt='GeoStats Logomark' width={106} height={96} className='object-contain  mb-8 '/>
						<Image src={ProBonoLogo} alt='ProBono Logomark' width={106} height={96} className='object-contain  mb-8 '/>
					</div>

					<p className='w-fit text-center mx-auto mb-8'>
						Nosotros somos <span className='font-bold'>[GeoStats]</span>.
					</p>
					<p className='max-w-2xl w-fit text-center mx-auto mb-8'>
						Somos un grupo de jóvenes mexicanos con interés de utilizar la cartografía social para construir
						conocimiento de forma colaborativa.
						Buscamos estandarizar y recopilar datos de las organizaciones Pro Bono para democratizar la generación y el
						acceso a la información.
					</p>
					<ALinkButton href='https://geostatsmty.com/' variant='outlined' size='lg' className='mx-auto'>
						Conocer más
					</ALinkButton>

				</div>

				<h2 className='text-stone-50 mx-auto w-fit text-center font-bold text-3xl mb-12'>
					¿Cómo funciona?
				</h2>
				<p className='w-fit text-center mx-auto mb-12'>
					En nuestra plataforma, las organizaciones Pro Bono de Nuevo Léon pueden registrarse y destacar su labor de
					manera sencilla.
				</p>
				<div className='text-stone-300 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-48'>
					<div className='border border-stone-800 rounded p-4 flex items-center gap-2'>
						<p className='font-bold text-2xl'>
							1.
						</p>
						<h3>
							Registrate en la plataforma creando una cuenta.
						</h3>
					</div>
					<div className='border border-stone-800 rounded p-4 flex items-center gap-2'>
						<p className='font-bold text-2xl'>
							2.
						</p>
						<h3>
							Proporciona información básica sobre la organización.
						</h3>
					</div>
					<div className='border border-stone-800 rounded p-4 flex items-center gap-2'>
						<p className='font-bold text-2xl'>
							3.
						</p>
						<h3>
							Llena los formularios y crea un perfil más completo de tu organización.
						</h3>
					</div>
				</div>
				<h2 className='text-stone-50 mx-auto w-fit text-center font-bold text-3xl mb-8'>
					¿Por qué registrarse?
				</h2>
				<div className='max-w-7xl mx-auto flex flex-col gap-4 mb-64'>
					<Dropdown label='Visibilidad'>
						Al estar en nuestra plataforma, las organizaciones ganan visibilidad ante posibles voluntarios, donantes y
						aliados.
					</Dropdown>
					<Dropdown label='Networking'>
						Conectarse con otros actores comprometidos en el cambio social, fomentando la conexión entre actores del
						ecosistema Pro Bono.
					</Dropdown>
					<Dropdown label='Recursos'>
						Acceder a herramientas, capacitaciones y oportunidades de fortalecimiento.
					</Dropdown>
				</div>

			</div>
			<div className='relative h-[600px] border-stone-700 flex justify-center items-center p-8'>
				<div className='absolute -z-10 top-0 bottom-0 left-0 right-0 overflow-hidden brightness-50 bg-gradient-to-b from-stone-950 to-transparent'>
					<Image src={map} alt='Background map' width={600} height={600} className='object-cover w-full h-full'/>
				</div>
				<div className='my-auto'>
					<h2 className='text-stone-50 font-bold text-3xl mx-auto w-fit mb-8 text-center'>
						¡Únete a nuestra plataforma y empieza a mostrar tu impacto hoy!
					</h2>
					<ALinkButton href='/api/auth/signup?returnTo=/my' className='mx-auto' size='lg'>
						Únirme ahora
					</ALinkButton>
				</div>
			</div>
		</div>
	);
}
