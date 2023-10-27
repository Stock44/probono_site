'use client';
import React, {useState} from 'react';
import {type Organization} from '@prisma/client';
import FacebookLogo from 'public/facebook_logo.png';
import InstagramLogo from 'public/instagram_logo.png';
import LinkedinLogo from 'public/linkedin_logo.png';
import Link from 'next/link';
import {NumberField} from '@/components/number-field.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import LogoSelector from '@/app/(main)/account/organization/logo-selector.tsx';
import TextField from '@/components/text-field.tsx';

export default function GeneralInfoForm({organization}: {readonly organization: Organization}) {
	const [organizationLogo, setOrganizationLogo] = useState<string>();

	return (
		<form autoComplete='off'>
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
				<LogoSelector organization={organization} logoUrl={organizationLogo} onLogoChange={setOrganizationLogo}/>
				<div className='flex grow gap-x-4 items-end flex-wrap'>
					<TextField isRequired label='Nombre de la organización' className='grow mb-4'/>
					<NumberField
						isRequired
						icon='calendar_month'
						label='Año de fundación'
						formatOptions={{
							useGrouping: false,
						}}
						minValue={1900}
						defaultValue={2023}
						className='basis-2/12 mb-4'
					/>
					<TextField
						label='Teléfono de contacto'
						name='phone'
						icon='phone'
						type='tel'
						className='flex-initial grow basis-full mb-4'
					/>
				</div>
			</div>

			<div className='flex gap-x-4'>
				<TextField
					label='Correo eléctronico de contacto'
					icon='email'
					name='email'
					type='email'
					className='flex-initial grow basis-5/12 mb-4'
				/>
				<TextField
					label='Página web'
					name='webpage'
					icon='globe'
					type='url'
					className='grow basis-5/12 mb-4'
				/>
			</div>

			<h2 className='text-stone-200 text-lg mb-4'>
				Redes sociales
			</h2>
			<div className='flex flex-wrap gap-x-4'>
				<TextField
					label='Facebook'
					icon={FacebookLogo}
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
				/>
				<TextField
					label='Instagram'
					icon={InstagramLogo}
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
				/>
				<TextField
					label='Twitter'
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
				/>
				<TextField
					label='TikTok'
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
				/>
				<TextField label='YouTube' type='url' className='flex-auto mb-4'/>
				<TextField label='LinkedIn' icon={LinkedinLogo} type='url' className='flex-auto mb-4'/>
			</div>
		</form>
	);
}
