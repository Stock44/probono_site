import React from 'react';
import Image, {getImageProps} from 'next/image';
import GeoStatsLogoMark from 'public/logos/geostats-logomark.png';
import labnl from '@/app/(main)/labnl_vignette.webp';
import labnl_mobile from '@/app/(main)/labnl_vignette_mobile.webp';
import map from '@/app/(main)/map.jpg';
import Dropdown from 'geostats-ui/dropdown.tsx';
import ALinkButton from 'geostats-ui/button/a-link-button.tsx';
import Paper from 'geostats-ui/paper/paper.tsx';

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
			<div className='relative mx-auto mb-48 flex w-full flex-col justify-center'>
				<picture className='flex h-[500px] min-h-[500px] w-auto justify-center overflow-hidden lg:h-[800px] lg:min-h-[800px]'>
					<source media='(min-width: 1024px)' srcSet={desktop} />
					<source srcSet={mobile} />
					<img {...rest} className='h-full w-auto max-w-none' />
				</picture>

				<div className='-mt-16 flex flex-col justify-end px-4 text-center text-stone-50 lg:absolute  lg:inset-0 lg:z-10 lg:mt-0 lg:justify-center lg:text-left'>
					<div className='mx-auto w-full max-w-7xl'>
						<div className='mx-auto max-w-xl lg:mx-0 lg:ml-32'>
							<h1 className='mx-auto mb-8 text-3xl font-bold lg:mx-0 lg:text-5xl'>
								Empodera a tu organización Pro Bono
							</h1>
							<p className='mx-auto mb-8 text-base lg:mx-0'>
								Únete a nuestra plataforma y muestra el impacto
								que tiene tu organización.
							</p>
							<ALinkButton
								href='/api/auth/signup?returnTo=/my'
								className='mx-auto shadow-stone-50/20  glow lg:mx-0'
								size='lg'
							>
								Regístrate ahora
							</ALinkButton>
						</div>
					</div>
				</div>
			</div>
			<div className='mx-auto max-w-7xl px-2 text-stone-300'>
				<Paper className='mx-auto mb-48 w-full' spacing='xl'>
					<Image
						src={GeoStatsLogoMark}
						alt='GeoStats Logomark'
						width={96}
						height={96}
						className='mx-auto mb-8'
					/>
					<p className='mx-auto mb-8 w-fit text-center'>
						Nosotros somos{' '}
						<span className='font-bold'>[GeoStats]</span>.
					</p>
					<p className='mx-auto mb-8 w-fit max-w-2xl text-center'>
						Somos un grupo de jóvenes mexicanos con interés de
						utilizar la cartografía social para construir
						conocimiento de forma colaborativa. Buscamos
						estandarizar y recopilar datos de las organizaciones Pro
						Bono para democratizar la generación y el acceso a la
						información.
					</p>
					<ALinkButton
						href='https://geostatsmty.com/'
						variant='outlined'
						size='lg'
						className='mx-auto'
					>
						Conocer más
					</ALinkButton>
				</Paper>

				<h2 className='mx-auto mb-12 w-fit text-center text-3xl font-bold text-stone-50'>
					¿Cómo funciona?
				</h2>
				<p className='mx-auto mb-12 w-fit text-center'>
					En nuestra plataforma, las organizaciones Pro Bono de Nuevo
					Léon pueden registrarse y destacar su labor de manera
					sencilla.
				</p>
				<div className='mb-48 grid grid-cols-1 gap-4 text-stone-300 lg:grid-cols-3'>
					<Paper hoverEffect className='flex items-center gap-2'>
						<p className='text-2xl font-bold'>1.</p>
						<h3>Registrate en la plataforma creando una cuenta.</h3>
					</Paper>
					<Paper hoverEffect className='flex items-center gap-2'>
						<p className='text-2xl font-bold'>2.</p>
						<h3>
							Proporciona información básica sobre la
							organización.
						</h3>
					</Paper>
					<Paper hoverEffect className='flex items-center gap-2'>
						<p className='text-2xl font-bold'>3.</p>
						<h3>
							Llena los formularios y crea un perfil más completo
							de tu organización.
						</h3>
					</Paper>
				</div>
				<h2 className='mx-auto mb-8 w-fit text-center text-3xl font-bold text-stone-50'>
					¿Por qué registrarse?
				</h2>
				<div className='mx-auto mb-64 flex max-w-7xl flex-col gap-4'>
					<Dropdown label='Visibilidad'>
						Al estar en nuestra plataforma, las organizaciones ganan
						visibilidad ante posibles voluntarios, donantes y
						aliados.
					</Dropdown>
					<Dropdown label='Networking'>
						Conectarse con otros actores comprometidos en el cambio
						social, fomentando la conexión entre actores del
						ecosistema Pro Bono.
					</Dropdown>
					<Dropdown label='Recursos'>
						Acceder a herramientas, capacitaciones y oportunidades
						de fortalecimiento.
					</Dropdown>
				</div>
			</div>
			<div className='relative flex h-[600px] items-center justify-center border-stone-700 p-8'>
				<div className='absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-stone-950 to-transparent brightness-50'>
					<Image
						src={map}
						alt='Background map'
						width={600}
						height={600}
						className='size-full object-cover'
					/>
				</div>
				<div className='my-auto'>
					<h2 className='mx-auto mb-8 w-fit text-center text-3xl font-bold text-stone-50'>
						¡Únete a nuestra plataforma y empieza a mostrar tu
						impacto hoy!
					</h2>
					<ALinkButton
						href='/api/auth/signup?returnTo=/my'
						className='mx-auto'
						size='lg'
					>
						Únirme ahora
					</ALinkButton>
				</div>
			</div>
		</div>
	);
}
