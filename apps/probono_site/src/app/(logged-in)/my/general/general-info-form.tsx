'use client';
import React from 'react';
import {Item} from 'react-stately';
import Image from 'next/image';
import CalendarMonth from '@material-design-icons/svg/round/calendar_month.svg';
import Email from '@material-design-icons/svg/round/email.svg';
import Public from '@material-design-icons/svg/round/public.svg';
import Phone from '@material-design-icons/svg/round/phone.svg';
import Done from '@material-design-icons/svg/round/done.svg';
import YoutubeLogo from 'public/logos/youtube.png';
import XLogo from 'public/logos/x.png';
import TikTokLogo from 'public/logos/tiktok.png';
import LinkedInLogo from 'public/logos/linkedin.png';
import InstagramLogo from 'public/logos/instagram.png';
import ThreadsLogo from 'public/logos/threads.png';
import FacebookLogo from 'public/logos/facebook.png';
import MastadonLogo from 'public/logos/mastadon.png';
import {
	type EmployeeCountCategory,
	type IncomeCategory,
	type VolunteerCountCategory,
	type Organization,
} from '@prisma/client';
import Delete from '@material-design-icons/svg/round/delete.svg';
import OrganizationDeletionDialog from './organization-deletion-dialog.tsx';
import {NumberField} from '@/components/number-field.tsx';
import OrganizationImagePicker from '@/app/(logged-in)/my/general/organization-image-picker.tsx';
import TextField from '@/components/text-field.tsx';
import Select from '@/components/select.tsx';
import Form, {type FormState} from '@/components/form/form.tsx';
import {organizationInitSchema, type OrganizationUpdate} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';
import Separator from '@/components/separator.tsx';
import {formatInMxn} from '@/lib/format-mxn.ts';
import FormHeader from '@/components/form-header.tsx';
import ModalTrigger from '@/components/modal/modal-trigger.tsx';

export type GeneralInfoFormProps = {
	readonly action: (state: FormState<OrganizationUpdate>, data: FormData) => Promise<FormState<OrganizationUpdate>>;
	readonly employeeCountCategories: EmployeeCountCategory[];
	readonly organization: Organization;
	readonly volunteerCountCategories: VolunteerCountCategory[];
	readonly incomeCategories: IncomeCategory[];
	readonly deleteOrganization: () => Promise<void>;
};

export default function GeneralInfoForm(props: GeneralInfoFormProps) {
	const {
		organization,
		volunteerCountCategories,
		employeeCountCategories,
		incomeCategories,
		action,
		deleteOrganization,
	} = props;
	const validate = formValidators(organizationInitSchema);
	return (
		<>
			<Form
				successToast={{
					title: 'Se han guardado los cambios.',
					icon: <Done/>,
				}}
				action={action}>
				<FormHeader
					title='Información general'
					description='Datos básicos sobre tu organización, como información de contacto y redes sociales.'/>
				<div className='flex items-center gap-x-4 w-full flex-wrap'>
					<div className='border rounded border-stone-700 w-full lg:w-auto flex justify-center items-center mb-4'>
						<OrganizationImagePicker
							action={action}
							organization={organization}
							label='Selecciona un nuevo logo para tu organización'/>
					</div>
					<div className='grow'>
						<div className='block lg:flex grow gap-x-4 flex-wrap'>
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
								icon={<CalendarMonth
									viewBox='0 0 24 24'
									className='h-4 w-4 fill-stone-600 group-focus-within:fill-stone-50'/>}
								label='Año de fundación'
								formatOptions={{
									useGrouping: false,
									maximumFractionDigits: 0,
								}}
								minValue={1900}
								defaultValue={organization.foundingYear}
								className='basis-2/12 mb-4'
								validate={validate.foundingYear}
							/>
						</div>
						<TextField
							label='Teléfono de contacto'
							name='phone'
							icon={<Phone viewBox='0 0 24 24' className='h-4 w-4 fill-stone-600 group-focus-within:fill-stone-50'/>}
							type='tel'
							className='flex-initial grow basis-full mb-4'
							validate={validate.phone}
							defaultValue={organization.phone ?? ''}
						/>
					</div>
				</div>

				<div className='flex-none lg:flex gap-x-4 items-end'>
					<TextField
						label='Correo eléctronico de contacto'
						icon={<Email viewBox='0 0 24 24' className='h-4 w-4 fill-stone-600 group-focus-within:fill-stone-50'/>}
						name='email'
						type='email'
						className='flex-initial grow basis-5/12 mb-4'
						validate={validate.email}
						defaultValue={organization.email ?? ''}
					/>
					<TextField
						label='Página web'
						name='webpage'
						icon={<Public viewBox='0 0 24 24' className='h-4 w-4 fill-stone-600 group-focus-within:fill-stone-50'/>}
						type='url'
						className='grow basis-5/12 mb-4'
						validate={validate.webpage}
						defaultValue={organization.webpage ?? ''}
					/>
				</div>

				<div className='flex-none lg:flex gap-4 items-end'>
					<Select
						label='¿Cuántos empleados remunerados economicamente tiene tu organización?'
						name='employeeCountCategoryId'
						items={employeeCountCategories} className='flex-1 mb-4 w-full'
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
												? category.minCount.toString()
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
						className='flex-1 w-full mb-4'
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
												? category.minCount.toString()
												: `${category.minCount} a ${category.maxCount}`)
									}
								</Item>
							)
						}
					</Select>
				</div>

				<div className='flex gap-x-4 items-end'>
					<Select
						label='¿Cuáles son los ingresos anuales de la organización?'
						name='incomeCategoryId'
						items={incomeCategories}
						className='flex-1'
						validate={validate.incomeCategoryId}
						defaultSelectedKey={organization.incomeCategoryId ?? undefined}
					>
						{
							category => (
								<Item>
									{
										category.maxIncome === null
											? `Mas de ${formatInMxn(category.minIncome)}`
											: (formatInMxn(category.minIncome) === formatInMxn(category.maxIncome)
												? formatInMxn(category.minIncome)
												: `${formatInMxn(category.minIncome)} a ${formatInMxn(category.maxIncome)}`)
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
				<div className='flex-none md:flex flex-wrap gap-x-4'>
					<TextField
						label='Facebook'
						name='facebook'
						icon={<Image
							src={FacebookLogo} alt='Facebook logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='grow basis-full sm:basis-5/12 mb-4'
						validate={validate.facebook}
						defaultValue={organization.facebook ? `https://www.facebook.com/${organization.facebook}` : ''}
					/>
					<TextField
						label='Instagram'
						name='instagram'
						icon={<Image
							src={InstagramLogo} alt='Instagram logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='grow basis-full sm:basis-5/12 mb-4'
						validate={validate.instagram}
						defaultValue={organization.instagram ? `https://www.instagram.com/${organization.instagram}` : ''}
					/>
					<TextField
						label='Cuenta de Threads'
						name='threads'
						icon={<Image
							src={ThreadsLogo} alt='Instagram logo' height={20}
							width={20}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='grow basis-full sm:basis-5/12 mb-4'
						validate={validate.threads}
						defaultValue={organization.threads ?? ''}
					/>
					<TextField
						label='X (anteriormente Twitter)'
						name='twitter'
						icon={<Image
							src={XLogo} alt='X logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='grow basis-full sm:basis-5/12 mb-4'
						validate={validate.twitter}
						defaultValue={organization.twitter ? `https://www.twitter.com/${organization.twitter}` : ''}
					/>
					<TextField
						label='TikTok'
						name='tiktok'
						icon={<Image
							src={TikTokLogo} alt='TikTok logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='grow basis-full sm:basis-5/12 mb-4'
						validate={validate.tiktok}
						defaultValue={organization.tiktok ? `https://www.tiktok.com/${organization.tiktok}` : ''}
					/>
					<TextField
						label='YouTube'
						name='youtube'
						icon={<Image
							src={YoutubeLogo} alt='Youtube logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='grow basis-full sm:basis-5/12 mb-4'
						validate={validate.youtube}
						defaultValue={organization.youtube ? `https://www.youtube.com/${organization.youtube}` : ''}
					/>
					<TextField
						label='LinkedIn'
						name='linkedIn'
						icon={<Image
							src={LinkedInLogo} alt='LinkedIn logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='flex-auto mb-4'
						validate={validate.linkedIn}
						defaultValue={organization.linkedIn ? `https://www.linkedin.com/${organization.linkedIn}` : ''}/>
					<TextField
						label='Cuenta de Mastadon'
						name='mastadon'
						icon={<Image
							src={MastadonLogo} alt='LinkedIn logo' height={16}
							width={16}
							className='group-focus-within:brightness-100 brightness-50'/>}
						type='url'
						className='flex-auto mb-4'
						validate={validate.mastadon}
						defaultValue={organization.mastadon ?? ''}
					/>
				</div>

			</Form>

			<Separator/>

			<h2 className='font-bold text-4xl text-red-400 mb-4'>
				Eliminar tu organización
			</h2>
			<p className='text-stone-300 mb-4'>
				Al eliminar la organización, borrarás todos los datos relacionados con la misma.
				Además, todos los usuarios que se estén asociados con esta organización dejaran de estarlo{' '}<span
					className='text-bold'>permanentemente.</span>
			</p>

			<ModalTrigger
				isDismissable
				className='text-red-400'
				variant='outlined'
				size='lg'
				label={
					<>
						<Delete className='me-1 fill-current'/>
						Eliminar organización
					</>
				}
			>
				<OrganizationDeletionDialog deleteOrganization={deleteOrganization} organization={organization}/>
			</ModalTrigger>
		</>
	);
}