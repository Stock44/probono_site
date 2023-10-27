import React from 'react';
import {useOverlayTriggerState} from 'react-stately';
import {useOverlayTrigger} from 'react-aria';
import {type Organization} from '@prisma/client';
import Image from 'next/image';
import Button from '@/components/button.tsx';
import Modal from '@/components/modal.tsx';
import Icon from '@/components/icon.tsx';
import ImageButton from '@/components/image-button.tsx';
import Dialog from '@/components/dialog.tsx';
import ImageDropZone from '@/components/image-drop-zone.tsx';

export type LogoSelectorProps = {
	readonly organization: Organization;
	readonly logo: File | undefined;
	readonly onLogoChange: (file: File | undefined) => void;
};

export default function LogoSelector(props: LogoSelectorProps) {
	const {organization, logo, onLogoChange} = props;
	const state = useOverlayTriggerState({});
	const {triggerProps, overlayProps} = useOverlayTrigger({type: 'dialog'}, state);

	return (
		<>
			{
				organization.logoUrl === null
					? <Button {...triggerProps} className='w-[140px] h-[140px]' variant='secondary'>
						<Icon iconName='add_photo_alternate' size='4xl' className='mx-auto'/>
					</Button>
					: <div className='group relative mb-4 rounded flex-none'>
						<ImageButton {...triggerProps} src={organization.logoUrl} alt={organization.name} width={140} height={140}/>
						<div className='text-stone-50 font-semibold absolute top-0 left-0 w-full h-full justify-center items-center hidden group-hover:flex group-hover:flex-col pointer-events-none'>
							<Icon iconName='add_photo_alternate' size='4xl'/>
						</div>
					</div>

			}
			{
				state.isOpen
						&& (
							<Modal state={state}>
								<Dialog {...overlayProps} title='Agrega un logo a tu organización'>
									<ImageDropZone label='Suelta el logo de tu organización aquí' file={logo} onFileChange={onLogoChange}/>
									<div className='flex gap-2 justify-end'>
										<Button
											variant='secondary' onPress={() => {
												onLogoChange(undefined);
												close();
											}}>
											Cancelar
										</Button>
										<Button onPress={close}>
											Confirmar
										</Button>
									</div>
								</Dialog>
							</Modal>
						)
			}
		</>
	);
}
