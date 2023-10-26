'use client';
import React, {useRef} from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import Image, {type StaticImageData} from 'next/image';
import ods1Logo from 'public/odsIcons/1.png';
import ods2Logo from 'public/odsIcons/2.png';
import ods3Logo from 'public/odsIcons/3.png';
import ods4Logo from 'public/odsIcons/4.png';
import ods5Logo from 'public/odsIcons/5.png';
import ods6Logo from 'public/odsIcons/6.png';
import ods7Logo from 'public/odsIcons/7.png';
import ods8Logo from 'public/odsIcons/8.png';
import ods9Logo from 'public/odsIcons/9.png';
import ods10Logo from 'public/odsIcons/10.png';
import ods11Logo from 'public/odsIcons/11.png';
import ods12Logo from 'public/odsIcons/12.png';
import ods13Logo from 'public/odsIcons/13.png';
import ods14Logo from 'public/odsIcons/14.png';
import ods15Logo from 'public/odsIcons/15.png';
import ods16Logo from 'public/odsIcons/16.png';
import ods17Logo from 'public/odsIcons/17.png';
import {type RadioGroupState, useRadioGroupState} from 'react-stately';
import {mergeProps, useFocusRing, usePress, useRadio, useRadioGroup, VisuallyHidden} from 'react-aria';
import clsx from 'clsx';
import Icon from '@/components/icon.tsx';

type Ods = [number, string, StaticImageData];

const ods: Ods[] = [
	[1, 'Fin de la pobreza', ods1Logo],
	[2, 'Hambre cero', ods2Logo],
	[3, 'Salud y bienestar', ods3Logo],
	[4, 'Educación de calidad', ods4Logo],
	[5, 'Igualdad de género', ods5Logo],
	[6, 'Agual limpia y saneamiento', ods6Logo],
	[7, 'Energía asequible y no contaminante', ods7Logo],
	[8, 'Trabajo decente y crecimiento económico', ods8Logo],
	[9, 'Industria, innovación e infraestructura', ods9Logo],
	[10, 'Reducción de las desigualdades', ods10Logo],
	[11, 'Ciudades y comunidades sostenibles', ods11Logo],
	[12, 'Producción y consumo responsables', ods12Logo],
	[13, 'Acción por el clima', ods13Logo],
	[14, 'Vida submarina', ods14Logo],
	[15, 'Vida de ecosistemas terrestres', ods15Logo],
	[16, 'Paz, justicia e instituciones sólidas', ods16Logo],
	[17, 'Alianzas para lograr los objetivos', ods17Logo],
];

type OdsRadioProps = {
	readonly state: RadioGroupState;
	readonly ods: Ods;
};

function OdsRadio(props: OdsRadioProps) {
	const {state, ods} = props;
	const [value, name, image] = ods;
	const ref = useRef(null);

	const {inputProps, isSelected} = useRadio({
		'aria-label': name,
		value: value.toString(),
	}, state, ref);

	const {isFocusVisible, focusProps} = useFocusRing();

	return (
		<label>
			<VisuallyHidden>
				<input {...mergeProps(inputProps, focusProps)} ref={ref}/>
				{name}
			</VisuallyHidden>
			<div
				aria-hidden='true'
				className={clsx('relative group rounded', isFocusVisible && 'ring-2 ring-stone-50')}>
				<Image className={clsx(isSelected && 'brightness-50', 'group-hover:brightness-75 rounded')} draggable='false' width={128} alt={name} src={image}/>
				{isSelected ? <Icon iconName='check_circle' className='absolute bottom-1 right-1 text-stone-50'/> : null}
			</div>
		</label>
	);
}

export type OdsSelectorProps = {
	readonly name?: string;
	readonly value?: number;
	readonly className?: string;
	readonly onChange?: (value: number) => void;
};

export default function OdsSelector(props: OdsSelectorProps) {
	const {value, onChange, className} = props;

	const state = useRadioGroupState({
		label: 'Selecciona el ODS que atiende tu organización',
		value: value?.toString() ?? '',
		onChange: onChange === undefined ? undefined : value => {
			onChange(Number.parseInt(value, 10));
		},
	});
	const {radioGroupProps, labelProps} = useRadioGroup({}, state);

	return (
		<div {...radioGroupProps} className={className}>
			<span {...labelProps} className='text-stone-300 text-sm'>
				Selecciona el ODS que atiende tu organización
			</span>
			<div className='flex gap-2 flex-wrap mt-1'>
				{ods.map(ods => (
					<OdsRadio key={ods[0]} state={state} ods={ods}/>
				))}
			</div>
		</div>
	);
}
