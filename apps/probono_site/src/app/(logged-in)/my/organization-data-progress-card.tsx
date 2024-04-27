'use client';
import React from 'react';
import {cx} from '@/lib/cva.ts';

// eslint-disable-next-line complexity
function getProgressClasses(progress: number) {
	return cx(
		'bg-stone-50 w-full h-full',
		progress === 0 && 'translate-x-[-97%]',
		progress > 0 && progress <= 5 && 'translate-x-[-95%]',
		progress > 5 && progress <= 10 && 'translate-x-[-90%]',
		progress > 10 && progress <= 15 && 'translate-x-[-85%]',
		progress > 15 && progress <= 20 && 'translate-x-[-80%]',
		progress > 20 && progress <= 25 && 'translate-x-[-75%]',
		progress > 25 && progress <= 30 && 'translate-x-[-70%]',
		progress > 30 && progress <= 35 && 'translate-x-[-65%]',
		progress > 35 && progress <= 40 && 'translate-x-[-60%]',
		progress > 40 && progress <= 45 && 'translate-x-[-55%]',
		progress > 45 && progress <= 50 && 'translate-x-[-50%]',
		progress > 50 && progress <= 55 && 'translate-x-[-45%]',
		progress > 55 && progress <= 60 && 'translate-x-[-40%]',
		progress > 60 && progress <= 65 && 'translate-x-[-35%]',
		progress > 65 && progress <= 70 && 'translate-x-[-30%]',
		progress > 70 && progress <= 75 && 'translate-x-[-25%]',
		progress > 75 && progress <= 80 && 'translate-x-[-20%]',
		progress > 80 && progress <= 85 && 'translate-x-[-15%]',
		progress > 85 && progress <= 90 && 'translate-x-[-10%]',
		progress > 90 && progress <= 95 && 'translate-x-[-5%]',
		progress > 95 && progress < 100 && 'translate-x-[-3%]',
	);
}

export type OrganizationDataProgressCardProps = {
	readonly className?: string;
};

export function OrganizationDataProgressCard(props: OrganizationDataProgressCardProps) {
	const {className} = props;
	const progress = 100;
	return (
		<div className={cx('border border-stone-800 p-4 rounded col-span-4 w-96', className)}>
			<h2 className='text-stone-300  mb-2 font-bold'>
				¡Completa la información de tu organización!
			</h2>
			<p className='text-stone-400 text-sm mb-4'>
				El tener mas información sobre ustedes nos ayuda a ponerlos en el mapa.
			</p>

			{/* <Progress.Root */}
			{/* 	value={progress} */}
			{/* 	className='h-6 bg-stone-900 rounded-xl overflow-hidden' */}
			{/* > */}
			{/* 	<Progress.Indicator className={getProgressClasses(progress)}/> */}
			{/* </Progress.Root> */}
		</div>
	);
}
