import React from 'react';
import Image, {getImageProps} from 'next/image';
import labnl from '@/app/(main)/labnl_vignette.webp';
import labnl_mobile from '@/app/(main)/labnl_vignette_mobile.webp';
import miImagenFondo from '@/app/(main)/labnl1 (2).png';
import AccountButtons from '@/app/account-buttons.tsx';
import imagen1 from '@/app/(main)/probononl.png';
import imagen2 from '@/app/(main)/encuesta.png';
import imagen3 from '@/app/(main)/respuesta.png';
import imagen4 from '@/app/(main)/time.png';
import LinkButton from '@/components/link-button.tsx';

export default function Home() {
	const alturaImagen = 'h-[80vh]';

	const common = {alt: 'Art Direction Example', sizes: '100vw'};
	const {
		props: {srcSet: desktop},
	} = getImageProps({
		...common,
		width: 1920,
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

	const sectionTexts = [
		'Estamos colaborando con el Ecosistema Pro Bono de Nuevo León (@probononl) y Vivero de Iniciativas Ciudadanas de España (www.civics.cc) para realizar un mapeo de iniciativas ciudadanas de Nuevo León.',
		'El siguiente formulario recolecta información de organizaciones, colectivos y toda aquella iniciativa ciudadana que buscan dar solución a algún tema de interés público en el estado de Nuevo León. ',
		'Las respuestas nos permitirán identificar en qué localidades llevan a cabo sus operaciones y qué acciones realizan en beneficio de la sociedad.',
		'Por tal motivo, te invitamos a participar dando respuesta al siguiente formulario. Contiene 15 secciones y toma alrededor de 35 minutos contestarla.',
	];

	const images = [imagen1, imagen2, imagen3, imagen4];

	return (
		<div className='w-full'>
			<div className='relative flex flex-col justify-center max-w-screen-2xl w-full mx-auto'>
				<picture className='min-h-[800px] h-[800px] overflow-hidden w-auto flex justify-center'>
					<source media='(min-width: 1024px)' srcSet={desktop}/>
					<source srcSet={mobile}/>
					<img {...rest} className='h-full w-auto max-w-none'/>
				</picture>

				<div
					className='absolute top-0 right-0 left-0 bottom-0 text-stone-50 max-w-xl lg:ml-24 z-10 flex flex-col justify-end lg:justify-center'>
					<h1 className='font-bold text-5xl mb-6'>Empodera a tu organización Pro Bono</h1>
					<h2 className='text-lg mb-6'>Únete a nuestra plataforma y muestra el impacto que tiene tu organización.</h2>
					<LinkButton href='/api/auth/register' className='p-2'>
						Registrate ahora
					</LinkButton>
				</div>
			</div>

			<div className={`grid grid-cols-4 w-full ${alturaImagen} bg-stone-950`}>
				{images.map((image, index) => (
					<div key={image.src} className='grid grid-rows-2 h-full'>
						<div className='w-full flex justify-center items-center'>
							<Image src={image} alt={`Sección ${index + 1} Imagen`} className='w-4/5 h-auto object-contain' width={300} height={300}/>
						</div>
						<div className='flex justify-center items-center text-stone-300 p-4'>
							<p>{sectionTexts[index]}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
