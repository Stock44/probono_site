'use client';
import React, {useState} from 'react';
import {type Organization} from '@prisma/client';
import Image from 'next/image';
import {LabeledInput} from '@/components/labeled-input.tsx';
import {NumberInput} from '@/components/number-input.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';

export default function GeneralInfoForm({organization}: {readonly organization: Organization}) {
	const [imageDropAreaOpen, setImageDropAreaOpen] = useState(false);

	const handleForm = async (formData: FormData) => {};

	return (
		<form>
			<div className='flex justify-between items-end mb-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Información general
					</h1>
					<p className='text-stone-300'>
						Datos básicos sobre tu organización, como información de contacto y redes sociales.
					</p>
				</div>
				<Button type='submit'>
					<Icon iconName='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<div/>
			<div className='flex items-end gap-x-4 w-full'>
				<div className='group relative mb-4 border border-stone-700 rounded flex-none'>
					{
						organization.logoUrl === null
							? <div
								className='w-[140px] h-[140px] text-stone-300 text-4xl flex justify-center items-center hover:text-stone-50 hover:bg-stone-900'>
								<Icon iconName='add_photo_alternate' size='4xl'/></div>
							: <>
								<Image
									src={organization.logoUrl} alt={organization.name} className='group-hover:brightness-50'
									width={140} height={140}/>
								<div className='text-stone-300 font-semibold absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex group-hover:flex-col'>
									<Icon iconName='add_photo_alternate' size='4xl'/>
								</div>
							</>
					}

				</div>

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
		</form>
	);
}
