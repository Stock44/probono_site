import React, {
	type ForwardedRef,
	forwardRef,
	type ReactNode,
	useState,
} from 'react';
import {useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import {type Organization} from '@prisma/client';
import AddPhotoAlternate from '@material-design-icons/svg/round/add_photo_alternate.svg';
import Save from '@material-design-icons/svg/round/save.svg';
import {
	organizationInitSchema,
	type OrganizationUpdate,
} from '@/lib/schemas/organization.ts';

import {Button, Modal, Dialog, FileDropZone, Form, type FormState, SubmitButton} from 'geostats-ui';

import ImageButton from '@/components/image-button.tsx';

export type OrganizationImagePickerProps = {
	readonly label: ReactNode;
	readonly organization: Organization;
	readonly action: (
		state: FormState<OrganizationUpdate>,
		data: FormData,
	) => Promise<FormState<OrganizationUpdate>>;
};

const OrganizationImagePicker = forwardRef(function OrganizationImagePicker(
	props: OrganizationImagePickerProps,
	ref: ForwardedRef<HTMLImageElement>,
) {
	const {label, organization, action} = props;
	const state = useOverlayTriggerState({});
	const {triggerProps, overlayProps} = useOverlayTrigger(
		{type: 'dialog'},
		state,
	);
	const {close} = state;
	const [error, setError] = useState<string>();

	return (
		<>
			{organization.logoUrl === null ? (
				<Button {...triggerProps} className='' variant='secondary'>
					<AddPhotoAlternate className='fill-current' />
				</Button>
			) : (
				<div className='group relative flex-none rounded'>
					<ImageButton
						{...triggerProps}
						src={organization.logoUrl}
						alt='Imagen seleccionada'
						className='size-36'
					/>
					<div className='pointer-events-none absolute left-0 top-0 hidden size-full items-center justify-center font-semibold text-stone-50 group-hover:flex group-hover:flex-col'>
						<AddPhotoAlternate className='fill-current' />
					</div>
				</div>
			)}
			{state.isOpen && (
				<Modal state={state}>
					<Dialog {...overlayProps} title={label}>
						<Form
							action={action}
							successToast={{
								title: 'Se ha guardado exitosamente el logo.',
								variant: 'success',
							}}
						>
							<FileDropZone
								className='mb-4 size-full'
								label={
									<>
										<AddPhotoAlternate className='mx-auto fill-current' />
										<div>
											Da clic para subir una imagen o
											suelta una imagen aquí.
										</div>
									</>
								}
								name='logo'
								error={error}
								acceptedMimeTypes={[
									'image/jpeg',
									'image/jpg',
									'image/webp',
									'image/png',
								]}
								onChange={async event => {
									if (
										event.target.files &&
										event.target.files.length === 0
									) {
										return;
									}

									const result = await organizationInitSchema
										.unwrap()
										.shape.logo.safeParseAsync(
											event.target.files![0],
										);

									if (result.success) {
										setError(undefined);
									} else {
										setError(
											result.error.issues[0].message,
										);
									}
								}}
							/>
							<div className='flex justify-between gap-4'>
								<Button variant='secondary' onPress={close}>
									Cancelar
								</Button>
								<SubmitButton icon={<Save />}>
									Guardar
								</SubmitButton>
							</div>
						</Form>
					</Dialog>
				</Modal>
			)}
		</>
	);
});

export default OrganizationImagePicker;
