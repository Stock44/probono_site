'use client';
import React from 'react';
import {type EmployeeCountCategory, type Organization, type VolunteerCountCategory} from '@prisma/client';
import FacebookLogo from 'public/facebook-logo.png';
import InstagramLogo from 'public/instagram-logo.png';
import LinkedinLogo from 'public/linkedin-logo.png';
import TikTokLogo from 'public/tiktok-logo.png';
import XLogo from 'public/x-logo.png';
import YoutubeLogo from 'public/youtube-logo.png';
import {Item} from 'react-stately';
import {NumberField} from '@/components/number-field.tsx';
import Icon from '@/components/icon.tsx';
import Button from '@/components/button.tsx';
import OrganizationImagePicker from '@/app/(my)/my/general/organization-image-picker.tsx';
import TextField from '@/components/text-field.tsx';
import Select from '@/components/select.tsx';
import Form from '@/components/form.tsx';
import upsertOrganizationAction from '@/lib/actions/organization.ts';
import {organizationSchema} from '@/lib/schemas/organizationInit.ts';
import {formValidators} from '@/lib/schemas/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';
import Separator from '@/components/separator.tsx';

export type GeneralInfoFormProps = {
	readonly organization: Organization;
	readonly volunteerCountCategories: VolunteerCountCategory[];
	readonly employeeCountCategories: EmployeeCountCategory[];
};

export default function GeneralInfoForm(props: GeneralInfoFormProps) {
	const {organization, volunteerCountCategories, employeeCountCategories} = props;

	const validate = formValidators(organizationSchema);

	return (
		<Form
			action={upsertOrganizationAction} id={organization.id}>
			<div className='flex items-end mb-4 gap-4'>
				<div>
					<h1 className='text-stone-200 text-4xl mb-2'>
						Información general
					</h1>
					<p className='text-stone-300'>
						Datos básicos sobre tu organización, como información de contacto y redes sociales.
					</p>
				</div>
				<div className='grow'/>
				<SubmitButton>
					<Icon name='save' className='me-1'/>
					Guardar
				</SubmitButton>
			</div>
			<div/>
			<div className='flex items-end gap-x-4 w-full'>
				<OrganizationImagePicker
					organization={organization}
					label='Selecciona un nuevo logo para tu organización'/>
				<div className='flex grow gap-x-4 flex-wrap'>
					<TextField
						isRequired
						label='Nombre de la organización'
						className='grow mb-4'
						name='name'
						validate={validate.name}
						defaultValue={organization.name}
					/>
					<NumberField
						isRequired
						icon='calendar_month'
						label='Año de fundación'
						formatOptions={{
							useGrouping: false,
						}}
						minValue={1900}
						defaultValue={organization.foundingYear}
						className='basis-2/12 mb-4'
						validate={validate.foundingYear}
					/>
					<TextField
						label='Teléfono de contacto'
						name='phone'
						icon='phone'
						type='tel'
						className='flex-initial grow basis-full mb-4'
						validate={validate.phone}
						defaultValue={organization.phone ?? ''}
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
					validate={validate.email}
					defaultValue={organization.email ?? ''}
				/>
				<TextField
					label='Página web'
					name='webpage'
					icon='globe'
					type='url'
					className='grow basis-5/12 mb-4'
					validate={validate.webpage}
					defaultValue={organization.webpage ?? ''}
				/>
			</div>

			<div className='flex gap-4 mb-4'>
				<Select
					label='¿Cuántos empleados remunerados economicamente tiene tu organización?'
					name='employeeCountCategoryId'
					items={employeeCountCategories} className='flex-1'
					validate={validate.employeeCountCategoryId}
					defaultSelectedKey={organization.employeeCountCategoryId ?? undefined}
				>
					{
						category => (
							<Item>
								{
									category.maxCount === null
										? `Mas de ${category.minCount}`
										: (category.minCount === category.maxCount
											? category.minCount
											: `${category.minCount} a ${category.maxCount}`)
								}
							</Item>
						)
					}
				</Select>
				<Select
					label='¿Cuántos voluntarios tiene tu organización?'
					name='volunteerCountCategoryId'
					items={volunteerCountCategories}
					className='flex-1'
					validate={validate.volunteerCountCategoryId}
					defaultSelectedKey={organization.volunteerCountCategoryId ?? undefined}
				>
					{
						category => (
							<Item>
								{
									category.maxCount === null
										? `Mas de ${category.minCount}`
										: (category.minCount === category.maxCount
											? category.minCount
											: `${category.minCount} a ${category.maxCount}`)
								}
							</Item>
						)
					}
				</Select>
			</div>

			<Separator/>

			<h2 className='text-stone-200 text-lg mb-4'>
				Redes sociales
			</h2>
			<div className='flex flex-wrap gap-x-4'>
				<TextField
					label='Facebook'
					name='facebook'
					icon={FacebookLogo}
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
					validate={validate.facebook}
					defaultValue={organization.facebook ? `https://www.facebook.com/${organization.facebook}` : ''}
				/>
				<TextField
					label='Instagram'
					name='instagram'
					icon={InstagramLogo}
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
					validate={validate.instagram}
					defaultValue={organization.instagram ? `https://www.instagram.com/${organization.instagram}` : ''}
				/>
				<TextField
					label='X (anteriormente Twitter)'
					name='twitter'
					icon={XLogo}
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
					validate={validate.twitter}
					defaultValue={organization.twitter ? `https://www.twitter.com/${organization.twitter}` : ''}
				/>
				<TextField
					label='TikTok'
					name='tiktok'
					icon={TikTokLogo}
					type='url'
					className='grow basis-full sm:basis-5/12 mb-4'
					validate={validate.tiktok}
					defaultValue={organization.tiktok ? `https://www.tiktok.com/${organization.tiktok}` : ''}
				/>
				<TextField
					label='YouTube'
					name='youtube'
					icon={YoutubeLogo}
					type='url'
					className='flex-auto mb-4'
					validate={validate.youtube}
					defaultValue={organization.youtube ? `https://www.youtube.com/${organization.youtube}` : ''}
				/>
				<TextField
					label='LinkedIn'
					name='linkedIn'
					icon={LinkedinLogo}
					type='url'
					className='flex-auto mb-4'
					validate={validate.linkedIn}
					defaultValue={organization.linkedIn ? `https://www.linkedin.com/${organization.linkedIn}` : ''}
				/>
			</div>

		</Form>
	);
}
