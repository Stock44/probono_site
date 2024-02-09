import React from 'react';
import Image from 'next/image';
import miImagenFondo from '@/app/(main)/labnl1 (2).png';
import AccountButtons from '@/app/account-buttons.tsx';
import imagen1 from '@/app/(main)/probononl.png';
import imagen2 from '@/app/(main)/encuesta.png';
import imagen3 from '@/app/(main)/respuesta.png';
import imagen4 from '@/app/(main)/time.png';

export default function Home() {
	const alturaImagen = 'h-[80vh]';

	const sectionTexts = [
		'Estamos colaborando con el Ecosistema Pro Bono de Nuevo León (@probononl) y Vivero de Iniciativas Ciudadanas de España (www.civics.cc) para realizar un mapeo de iniciativas ciudadanas de Nuevo León.',
		'El siguiente formulario recolecta información de organizaciones, colectivos y toda aquella iniciativa ciudadana que buscan dar solución a algún tema de interés público en el estado de Nuevo León. ',
		'Las respuestas nos permitirán identificar en qué localidades llevan a cabo sus operaciones y qué acciones realizan en beneficio de la sociedad.',
		'Por tal motivo, te invitamos a participar dando respuesta al siguiente formulario. Contiene 15 secciones y toma alrededor de 35 minutos contestarla.',
	];

	const images = [imagen1, imagen2, imagen3, imagen4];

	return (
		<div className='w-full'>
			<div className={`relative w-full ${alturaImagen}`}>
				<img src={miImagenFondo.src} alt='Imagen de Fondo' className='w-full h-full object-cover absolute top-0 left-0 z-[-2]'/>

				<div className='absolute top-0 left-0 z-10 text-white p-16'>
					<h1 className='text-7xl mb-10 w-[400px] ml-12'>Registra tu organización!</h1>
					<h2 className='text-xl mb-10 w-[400px] ml-20'>ve de manera visual con cartografía y geoestadística, el impacto que tiene tu iniciativa</h2>
					<div className='ml-36'>
						<AccountButtons onlyRegisterButton/>
					</div>
				</div>
			</div>

			<div className={`grid grid-cols-4 w-full ${alturaImagen} bg-stone-950`}>
				{images.map((image, index) => (
					<div key={image.src} className='grid grid-rows-2 h-full'>
						<div className='w-full flex justify-center items-center'>
							<Image src={image} alt={`Sección ${index + 1} Imagen`} className='w-4/5 h-auto object-contain'/>
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
