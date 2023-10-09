'use client';
import React from 'react';
import OdsSelector from '@/components/ods-selector.tsx';

export default function PersonInfoForm() {
	return (
		<form>
			<h3 className='text-stone-300 text-lg mb-4'>
				Selecciona el ODS que atiende tu organización
			</h3>
			<OdsSelector/>
		</form>
	);
}
