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
import FacebookLogo from 'public/logos/facebook.png';
import {
	type EmployeeCountCategory,
	type IncomeCategory,
	type VolunteerCountCategory,
	type Organization,
} from '@prisma/client';
import OrganizationImagePicker from '@/app/(logged-in)/my/general/organization-image-picker.tsx';
import {
	organizationInitSchema,
	type OrganizationUpdate,
} from '@/lib/schemas/organization.ts';
import {formValidators} from '@/lib/form-utils.ts';
import {formatInMxn} from '@/lib/format-mxn.ts';
import {Form, type FormState, FormHeader} from '@/components/form';
import {NumberField, TextField, Select, Separator} from 'geostats-ui';

export type GeneralInfoFormProps = {
	readonly action: (
		state: FormState<OrganizationUpdate>,
		data: FormData,
	) => Promise<FormState<OrganizationUpdate>>;
	readonly employeeCountCategories: EmployeeCountCategory[];
	readonly organization: Organization;
	readonly volunteerCountCategories: VolunteerCountCategory[];
	readonly incomeCategories: IncomeCategory[];
};

export default function GeneralInfoForm(props: GeneralInfoFormProps) {
	const {
		organization,
		volunteerCountCategories,
		employeeCountCategories,
		incomeCategories,
		action,
	} = props;

	const validate = formValidators(organizationInitSchema);
	return (
		<Form
			successToast={{
				title: 'Se han guardado los cambios.',
				icon: <Done />,
			}}
			action={action}
		>
			<FormHeader
				title="Información general"
				description="Datos básicos sobre tu organización, como información de contacto y redes sociales."
			/>
			<div className="flex w-full flex-wrap items-center gap-x-4">
				<div className="mb-4 flex w-full items-center justify-center rounded border border-stone-700 lg:w-auto">
					<OrganizationImagePicker
						action={action}
						organization={organization}
						label="Selecciona un nuevo logo para tu organización"
					/>
				</div>
				<div className="grow">
					<div className="block grow flex-wrap gap-x-4 lg:flex">
						<TextField
							isRequired
							label="Nombre de la organización"
							className="mb-4 grow"
							name="name"
							validate={validate.name}
							defaultValue={organization.name}
						/>
						<NumberField
							isRequired
							icon={
								<CalendarMonth
									viewBox="0 0 24 24"
									className="size-4 fill-stone-600 group-focus-within:fill-stone-50"
								/>
							}
							label="Año de fundación"
							formatOptions={{
								useGrouping: false,
								maximumFractionDigits: 0,
							}}
							minValue={1900}
							defaultValue={organization.foundingYear}
							className="mb-4 basis-2/12"
							validate={validate.foundingYear}
						/>
					</div>
					<TextField
						label="Teléfono de contacto"
						name="phone"
						icon={
							<Phone
								viewBox="0 0 24 24"
								className="size-4 fill-stone-600 group-focus-within:fill-stone-50"
							/>
						}
						type="tel"
						className="mb-4 flex-initial grow basis-full"
						validate={validate.phone}
						defaultValue={organization.phone ?? ''}
					/>
				</div>
			</div>

			<div className="flex-none items-end gap-x-4 lg:flex">
				<TextField
					label="Correo eléctronico de contacto"
					icon={
						<Email
							viewBox="0 0 24 24"
							className="size-4 fill-stone-600 group-focus-within:fill-stone-50"
						/>
					}
					name="email"
					type="email"
					className="mb-4 flex-initial grow basis-5/12"
					validate={validate.email}
					defaultValue={organization.email ?? ''}
				/>
				<TextField
					label="Página web"
					name="webpage"
					icon={
						<Public
							viewBox="0 0 24 24"
							className="size-4 fill-stone-600 group-focus-within:fill-stone-50"
						/>
					}
					type="url"
					className="mb-4 grow basis-5/12"
					validate={validate.webpage}
					defaultValue={organization.webpage ?? ''}
				/>
			</div>

			<div className="flex-none items-end gap-4 lg:flex">
				<Select
					label="¿Cuántos empleados remunerados economicamente tiene tu organización?"
					name="employeeCountCategoryId"
					items={employeeCountCategories}
					className="mb-4 w-full flex-1"
					validate={validate.employeeCountCategoryId}
					defaultSelectedKey={
						organization.employeeCountCategoryId ?? undefined
					}
				>
					{category => (
						<Item>
							{category.maxCount === null
								? `Mas de ${category.minCount}`
								: category.minCount === category.maxCount
									? category.minCount.toString()
									: `${category.minCount} a ${category.maxCount}`}
						</Item>
					)}
				</Select>
				<Select
					label="¿Cuántos voluntarios tiene tu organización?"
					name="volunteerCountCategoryId"
					items={volunteerCountCategories}
					className="mb-4 w-full flex-1"
					validate={validate.volunteerCountCategoryId}
					defaultSelectedKey={
						organization.volunteerCountCategoryId ?? undefined
					}
				>
					{category => (
						<Item>
							{category.maxCount === null
								? `Mas de ${category.minCount}`
								: category.minCount === category.maxCount
									? category.minCount.toString()
									: `${category.minCount} a ${category.maxCount}`}
						</Item>
					)}
				</Select>
			</div>

			<div className="flex items-end gap-x-4">
				<Select
					label="¿Cuáles son los ingresos anuales de la organización?"
					name="incomeCategoryId"
					items={incomeCategories}
					className="flex-1"
					validate={validate.incomeCategoryId}
					defaultSelectedKey={
						organization.incomeCategoryId ?? undefined
					}
				>
					{category => (
						<Item>
							{category.maxIncome === null
								? `Mas de ${formatInMxn(category.minIncome)}`
								: formatInMxn(category.minIncome) ===
								formatInMxn(category.maxIncome)
									? formatInMxn(category.minIncome)
									: `${formatInMxn(category.minIncome)} a ${formatInMxn(category.maxIncome)}`}
						</Item>
					)}
				</Select>
			</div>

			<Separator />

			<h2 className="mb-4 text-lg text-stone-200">Redes sociales</h2>
			<div className="flex-none flex-wrap gap-x-4 md:flex">
				<TextField
					label="Facebook"
					name="facebook"
					icon={
						<Image
							src={FacebookLogo}
							alt="Facebook logo"
							height={16}
							width={16}
							className="brightness-50 group-focus-within:brightness-100"
						/>
					}
					type="url"
					className="mb-4 grow basis-full sm:basis-5/12"
					validate={validate.facebook}
					defaultValue={
						organization.facebook
							? `https://www.facebook.com/${organization.facebook}`
							: ''
					}
				/>
				<TextField
					label="Instagram"
					name="instagram"
					icon={
						<Image
							src={InstagramLogo}
							alt="Instagram logo"
							height={16}
							width={16}
							className="brightness-50 group-focus-within:brightness-100"
						/>
					}
					type="url"
					className="mb-4 grow basis-full sm:basis-5/12"
					validate={validate.instagram}
					defaultValue={
						organization.instagram
							? `https://www.instagram.com/${organization.instagram}`
							: ''
					}
				/>
				<TextField
					label="X (anteriormente Twitter)"
					name="twitter"
					icon={
						<Image
							src={XLogo}
							alt="X logo"
							height={16}
							width={16}
							className="brightness-50 group-focus-within:brightness-100"
						/>
					}
					type="url"
					className="mb-4 grow basis-full sm:basis-5/12"
					validate={validate.twitter}
					defaultValue={
						organization.twitter
							? `https://www.twitter.com/${organization.twitter}`
							: ''
					}
				/>
				<TextField
					label="TikTok"
					name="tiktok"
					icon={
						<Image
							src={TikTokLogo}
							alt="TikTok logo"
							height={16}
							width={16}
							className="brightness-50 group-focus-within:brightness-100"
						/>
					}
					type="url"
					className="mb-4 grow basis-full sm:basis-5/12"
					validate={validate.tiktok}
					defaultValue={
						organization.tiktok
							? `https://www.tiktok.com/${organization.tiktok}`
							: ''
					}
				/>
				<TextField
					label="YouTube"
					name="youtube"
					icon={
						<Image
							src={YoutubeLogo}
							alt="Youtube logo"
							height={16}
							width={16}
							className="brightness-50 group-focus-within:brightness-100"
						/>
					}
					type="url"
					className="mb-4 flex-auto"
					validate={validate.youtube}
					defaultValue={
						organization.youtube
							? `https://www.youtube.com/${organization.youtube}`
							: ''
					}
				/>
				<TextField
					label="LinkedIn"
					name="linkedIn"
					icon={
						<Image
							src={LinkedInLogo}
							alt="LinkedIn logo"
							height={16}
							width={16}
							className="brightness-50 group-focus-within:brightness-100"
						/>
					}
					type="url"
					className="mb-4 flex-auto"
					validate={validate.linkedIn}
					defaultValue={
						organization.linkedIn
							? `https://www.linkedin.com/${organization.linkedIn}`
							: ''
					}
				/>
			</div>
		</Form>
	);
}
