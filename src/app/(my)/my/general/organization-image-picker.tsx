import React, {type ForwardedRef, forwardRef, type ReactNode, useState} from 'react';
import {useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import Image from 'next/image';
import {type Organization} from '@prisma/client';
import {Buda} from 'next/dist/compiled/@next/font/dist/google';
import Button from '@/components/button.tsx';
import Modal from '@/components/modal.tsx';
import Icon from '@/components/icon.tsx';
import ImageButton from '@/components/image-button.tsx';
import Dialog from '@/components/dialog.tsx';
import FileDropZone from '@/components/file-drop-zone.tsx';
import {cx} from '@/lib/cva.ts';
import Form from '@/components/form.tsx';
import upsertOrganizationAction from '@/lib/actions/organization.ts';
import {organizationSchema} from '@/lib/schemas/organizationInit.ts';
import {formValidators} from '@/lib/schemas/form-utils.ts';

export type LogoSelectorProps = {
	readonly label: ReactNode;
	readonly organization: Organization;
};

const OrganizationImagePicker = forwardRef((props: LogoSelectorProps, ref: ForwardedRef<HTMLImageElement>) => {
	const {label, organization} = props;
	const state = useOverlayTriggerState({});
	const {triggerProps, overlayProps} = useOverlayTrigger({type: 'dialog'}, state);
	const {close} = state;
	const validate = formValidators(organizationSchema);

	return (
		<>
			{
				organization.logoUrl === null
					? <Button {...triggerProps} className='' variant='secondary'>
						<Icon iconName='add_photo_alternate' size='4xl' className='mx-auto'/>
					</Button>
					: <div className='group relative mb-4 rounded flex-none'>
						<ImageButton {...triggerProps} src={organization.logoUrl} alt='Imagen seleccionada' className='w-36 h-36'/>
						<div className='text-stone-50 font-semibold absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex group-hover:flex-col pointer-events-none'>
							<Icon iconName='add_photo_alternate' size='4xl'/>
						</div>
					</div>

			}
			{
				state.isOpen
						&& (
							<Modal state={state}>
								<Dialog {...overlayProps} title={label}>
									<Form
										action={upsertOrganizationAction} staticValues={{
											id: organization.id,
										}} redirectTo='/my/general'>
										<FileDropZone className='w-full h-full mb-4' label='Da click para subir una imagen o suelta una imagen aqui.' name='logo' validate={validate.logo}/>
										<div className='flex justify-between gap-4'>
											<Button onPress={close}>
												Cancelar
											</Button>
											<Button type='submit'>
												<Icon iconName='save' className='me-1'/>
												Guardar
											</Button>
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
