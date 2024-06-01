import React from 'react';
import Save from '@material-design-icons/svg/round/save.svg';
import {SubmitButton} from './submit-button.tsx';

export type FormHeaderProps = {
	readonly title: string;
	readonly description: string;
};

export function FormHeader(props: FormHeaderProps) {
	const {title, description} = props;
	return (
		<div className='mb-4 flex flex-wrap items-end gap-3'>
			<div className='w-full lg:w-auto'>
				<h1 className='mb-2 text-4xl text-stone-200'>{title}</h1>
				<p className='text-stone-300'>{description}</p>
			</div>
			<div className='hidden grow lg:block' />
			<SubmitButton icon={<Save />} className='shadow-stone-700 glow-xl'>
				Guardar
			</SubmitButton>
		</div>
	);
}
