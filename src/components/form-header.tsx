import React from 'react';
import Save from '@material-design-icons/svg/round/save.svg';
import SubmitButton from '@/components/submit-button.tsx';

export type FormHeaderProps = {
	readonly title: string;
	readonly description: string;
};

export default function FormHeader(props: FormHeaderProps) {
	const {title, description} = props;
	return (
		<div className='flex items-end mb-4 flex-wrap gap-3'>
			<div className='w-full lg:w-auto'>
				<h1 className='text-stone-200 text-4xl mb-2'>
					{title}
				</h1>
				<p className='text-stone-300'>
					{description}
				</p>
			</div>
			<div className='grow hidden lg:block'/>
			<SubmitButton icon={<Save/>}>
				Guardar
			</SubmitButton>
		</div>
	);
}
