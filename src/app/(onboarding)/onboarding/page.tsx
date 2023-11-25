import React from 'react';
import Link from 'next/link';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';

export default function OnboardingPage() {
	return (
		<main>
			<h1 className='text-2xl text-stone-50 mb-2'>Hola!</h1>
			<p className='mb-2'>
				De parte de <span className='font-bold'>GeoStats</span> agradecemos tu
				interés por sumarte a nuestra plataforma.
			</p>
			<p className='mb-2'>
				Desde la iniciativa del{' '}
				<span className='font-bold'>Ecosistema Pro Bono de Nuevo León</span> y
				el liderazgo de la comunidad de{' '}
				<span className='font-bold'>GeoStats</span>, buscamos recolectar
				información para identificar a las OSC, colectivos y grupos de
				ciudadanxs que buscan dar solución a algún tema de interés público en el
				estado de Nuevo León.
			</p>
			<p className='mb-4'>
				Antes de nada, queremos conocer más sobre ti y tu organización.
			</p>

			<Link href='/onboarding/user'>
				<Button>
					Continuar <Icon name='navigate_next'/>
				</Button>
			</Link>
		</main>
	);
}
