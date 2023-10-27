'use client';
import React, {useState} from 'react';
import {type Organization} from '@prisma/client';
import Image from 'next/image';
import {LabeledInput} from '@/components/labeled-input.tsx';
import {NumberInput} from '@/components/number-input.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import ModalTrigger from '@/components/modal-trigger.tsx';
import ImageButton from '@/components/image-button.tsx';
import LogoSelector from '@/app/(main)/account/organization/logo-selector.tsx';

export default function GeneralInfoForm({organization}: {readonly organization: Organization}) {
	const [imageDropAreaOpen, setImageDropAreaOpen] = useState(false);

	const handleForm = async (formData: FormData) => {};

	const [organizationLogo, setOrganizationLogo] = useState<File>();

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
				<Button isDisabled type='submit'>
					<Icon iconName='save' className='me-1'/>
					Guardar
				</Button>
			</div>
			<div/>
			<div className='flex items-end gap-x-4 w-full'>
				<LogoSelector organization={organization} logo={organizationLogo} onLogoChange={setOrganizationLogo}/>
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
