import React, {type ForwardedRef, forwardRef, type ReactNode, useState} from 'react';
import {useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import {type Organization} from '@prisma/client';
import AddPhotoAlternate from '@material-design-icons/svg/round/add_photo_alternate.svg';
import Save from '@material-design-icons/svg/round/save.svg';
import Button from '@/components/button.tsx';
import Modal from '@/components/modal/modal.tsx';
import ImageButton from '@/components/image-button.tsx';
import Dialog from '@/components/dialog.tsx';
import FileDropZone from '@/components/file-drop-zone.tsx';
import Form, {type FormState} from '@/components/form/form.tsx';
import {organizationInitSchema, type OrganizationUpdate} from '@/lib/schemas/organization.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type OrganizationImagePickerProps = {
	readonly label: ReactNode;
	readonly organization: Organization;
	readonly action: (state: FormState<OrganizationUpdate>, data: FormData) => Promise<FormState<OrganizationUpdate>>;
};

const OrganizationImagePicker = forwardRef((props: OrganizationImagePickerProps, ref: ForwardedRef<HTMLImageElement>) => {
	const {label, organization, action} = props;
	const state = useOverlayTriggerState({});
	const {triggerProps, overlayProps} = useOverlayTrigger({type: 'dialog'}, state);
	const {close} = state;
	const [error, setError] = useState<string>();

	return (
		<>
			{
				organization.logoUrl === null
					? <Button {...triggerProps} className='' variant='secondary'>
						<AddPhotoAlternate className='fill-current'/>
					</Button>
					: <div className='group relative rounded flex-none'>
						<ImageButton {...triggerProps} src={organization.logoUrl} alt='Imagen seleccionada' className='w-36 h-36'/>
						<div className='text-stone-50 font-semibold absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex group-hover:flex-col pointer-events-none'>
							<AddPhotoAlternate className='fill-current'/>
						</div>
					</div>

			}
			{
				state.isOpen
						&& (
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
											className='w-full h-full mb-4' label={
												<>
													<AddPhotoAlternate className='fill-current mx-auto'/>
													<div>
														Da clic para subir una imagen o suelta una imagen aquí.
													</div>
												</>
											} name='logo'
											error={error}
											acceptedMimeTypes={['image/jpeg', 'image/jpg', 'image/webp', 'image/png']}
											onChange={async event => {
												if (event.target.files && event.target.files.length === 0) {
													return;
												}

												const result = await organizationInitSchema.unwrap().shape.logo.safeParseAsync(event.target.files![0]);

												if (result.success) {
													setError(undefined);
												} else {
													setError(result.error.issues[0].message);
												}
											}}
										/>
										<div className='flex justify-between gap-4'>
											<Button variant='secondary' onPress={close}>
												Cancelar
											</Button>
											<SubmitButton icon={<Save/>}>
												Guardar
											</SubmitButton>
										</div>
									</Form>
								</Dialog>
							</Modal>
						)
			}
		</>
	);
});

export default OrganizationImagePicker;
