'use client';
import React, {useState} from 'react';
import {type Organization} from '@prisma/client';
import Image from 'next/image';
import {LabeledInput} from '@/components/labeled-input.tsx';
import ImageDropArea from '@/components/image-drop-area.tsx';
import {NumberInput} from '@/components/number-input.tsx';
import Icon from '@/components/icon.tsx';
import {Button} from '@/components/button.tsx';

export default function GeneralInfoForm({organization}: {readonly organization: Organization}) {
	const [imageDropAreaOpen, setImageDropAreaOpen] = useState(false);

	const handleForm = async (formData: FormData) => {};

	return (
		<form>
			<div className='flex items-end gap-x-4 w-full'>
				{
					imageDropAreaOpen || organization.logoUrl === null ? <ImageDropArea label='Suelta una imagen para tu logo aquí' className='w-48 h-48'/>
						: <button
							className='relative group mb-4' onClick={() => {
								setImageDropAreaOpen(true);
							}}
						>
							<Image src={organization.logoUrl} alt={organization.name} width={192} height={192}/>
							<div
								className='text-stone-200 text-lg font-semibold absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex group-hover:flex-col bg-stone-800 opacity-50'
							>
								<Icon iconName='add_photo_alternate' size='6xl'/>
								Cambiar imagen
							</div>
						</button>
				}
				<div className='flex grow gap-x-4 items-end flex-wrap'>
					<LabeledInput required label='Nombre de la organización' className='grow'/>
					<NumberInput
						required
						name='foundingYear'
						label='Año de fundación'
						defaultValue={2023}
						className='basis-2/12'
					/>
					<LabeledInput
						label='Teléfono de contacto'
						name='phone'
						type='tel'
						className='flex-initial grow basis-full'
					/>
				</div>
			</div>

			<div className='flex gap-x-4'>
				<LabeledInput
					label='Correo eléctronico de contacto'
					name='email'
					type='email'
					className='flex-initial grow basis-5/12'
				/>
				<LabeledInput
					label='Página web'
					name='webpage'
					type='url'
					className='grow basis-5/12'
				/>
			</div>

			<h2 className='text-stone-200 text-lg mb-2'>
				Redes sociales
			</h2>
			<div className='flex flex-wrap gap-x-4'>
				<LabeledInput
					label='Facebook'
					type='url'
					className='grow basis-full sm:basis-5/12'
				/>
				<LabeledInput
					label='Instagram'
					type='url'
					className='grow basis-full sm:basis-5/12'
				/>
				<LabeledInput
					label='Twitter'
					type='url'
					className='grow basis-full sm:basis-5/12'
				/>
				<LabeledInput
					label='TikTok'
					type='url'
					className='grow basis-full sm:basis-5/12'
				/>
				<LabeledInput label='YouTube' type='url' className='flex-auto'/>
				<LabeledInput label='LinkedIn' type='url' className='flex-auto'/>
			</div>
			<Button className='w-24 justify-center'><Icon iconName='save' className='me-2'/>Guardar</Button>
		</form>
	);
}
