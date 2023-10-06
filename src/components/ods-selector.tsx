'use client';
import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import Image, {type StaticImageData} from 'next/image';
import ods1Logo from '@/public/odsIcons/1.png';
import ods2Logo from '@/public/odsIcons/2.png';
import ods3Logo from '@/public/odsIcons/3.png';
import ods4Logo from '@/public/odsIcons/4.png';
import ods5Logo from '@/public/odsIcons/5.png';
import ods6Logo from '@/public/odsIcons/6.png';
import ods7Logo from '@/public/odsIcons/7.png';
import ods8Logo from '@/public/odsIcons/8.png';
import ods9Logo from '@/public/odsIcons/9.png';
import ods10Logo from '@/public/odsIcons/10.png';
import ods11Logo from '@/public/odsIcons/11.png';
import ods12Logo from '@/public/odsIcons/12.png';
import ods13Logo from '@/public/odsIcons/13.png';
import ods14Logo from '@/public/odsIcons/14.png';
import ods15Logo from '@/public/odsIcons/15.png';
import ods16Logo from '@/public/odsIcons/16.png';
import ods17Logo from '@/public/odsIcons/17.png';

type Ods = [number, string, StaticImageData];

const ods: Ods[] = [
	[1, 'Fin de la pobreza', ods1Logo],
	[2, 'Hambre cero', ods2Logo],
	[3, 'Salud y bienestar', ods3Logo],
	[4, 'Educación de calidad', ods4Logo],
	[5, 'Igualdad de género', ods5Logo],
	[6, 'Agual limpia y saneamiento', ods6Logo],
	[7, 'Energía asequible y no contaminante', ods7Logo],
	[8, 'Trabajo decente y crecimiento económico', ods8Logo],
	[9, 'Industria, innovación e infraestructura', ods9Logo],
	[10, 'Reducción de las desigualdades', ods10Logo],
	[11, 'Ciudades y comunidades sostenibles', ods11Logo],
	[12, 'Producción y consumo responsables', ods12Logo],
	[13, 'Acción por el clima', ods13Logo],
	[14, 'Vida submarina', ods14Logo],
	[15, 'Vida de ecosistemas terrestres', ods15Logo],
	[16, 'Paz, justicia e instituciones sólidas', ods16Logo],
	[17, 'Alianzas para lograr los objetivos', ods17Logo],
];

export default function OdsSelector(props: React.ComponentProps<'div'>) {
	return (
		<div {...props}>
			<RadioGroup.Root className='flex flex-wrap gap-2 justify-center '>
				{ods.map(([number, name, logo]) => (
					<RadioGroup.Item
						key={number}
						className='relative min-w-fit min-h-fit'
						value={number.toString()}
					>
						<Image className='z-0 rounded' width={128} alt={name} src={logo}/>
						<RadioGroup.Indicator className='absolute left-0 top-0 z-10 w-full h-full bg-blue-700 opacity-40 rounded'/>
						<RadioGroup.Indicator className='absolute bottom-1 right-1 z-20 rounded text-blue-800 material-symbols-rounded'>
							check_circle
						</RadioGroup.Indicator>
					</RadioGroup.Item>
				))}
			</RadioGroup.Root>
		</div>
	);
}
