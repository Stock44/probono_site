'use client';
import React, {useRef} from 'react';
import CheckCircle from '@material-design-icons/svg/round/check_circle.svg';
import Image, {type StaticImageData} from 'next/image';
import {type CheckboxGroupProps, type CheckboxGroupState, useCheckboxGroupState} from 'react-stately';
import {useToggleState} from 'react-stately';
import {mergeProps, useFocusRing, VisuallyHidden} from 'react-aria';
import {
	type AriaCheckboxProps,
	useCheckbox,
	useCheckboxGroup,
} from 'react-aria';
import ods13Logo from 'public/ods-icons/13.png';
import ods14Logo from 'public/ods-icons/14.png';
import ods15Logo from 'public/ods-icons/15.png';
import ods16Logo from 'public/ods-icons/16.png';
import ods17Logo from 'public/ods-icons/17.png';
import ods1Logo from 'public/ods-icons/1.png';
import ods2Logo from 'public/ods-icons/2.png';
import ods3Logo from 'public/ods-icons/3.png';
import ods4Logo from 'public/ods-icons/4.png';
import ods5Logo from 'public/ods-icons/5.png';
import ods6Logo from 'public/ods-icons/6.png';
import ods7Logo from 'public/ods-icons/7.png';
import ods8Logo from 'public/ods-icons/8.png';
import ods9Logo from 'public/ods-icons/9.png';
import ods10Logo from 'public/ods-icons/10.png';
import ods11Logo from 'public/ods-icons/11.png';
import ods12Logo from 'public/ods-icons/12.png';
import {cx} from '@/lib/cva.ts';

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

export type OdsSelectorProps = {
	readonly name?: string;
	readonly className?: string;
} & CheckboxGroupProps & AriaCheckboxProps;

export default function OdsSelector(props: OdsSelectorProps) {
	const {className, label} = props;

	const state = useCheckboxGroupState(props);
	const {labelProps} = useCheckboxGroup(props, state);

	return (
		<div {...useCheckboxGroup} className={className}>
			<span {...labelProps} className='text-stone-400 text-sm'>
				{label}
			</span>
			<div className='flex gap-4 flex-wrap mt-1 justify-around'>
				{ods.map(ods => (
					<OdsCheckbox key={ods[0]} ods={ods}/>
				))}
			</div>
		</div>
	);
}

type OdsCheckboxProps = {
	readonly ods: Ods;
} & AriaCheckboxProps;

function OdsCheckbox(props: OdsCheckboxProps) {
	const {ods} = props;
	const [value, name, image] = ods;
	const {children} = props;
	const state = useToggleState(props);
	const ref = React.useRef(null);
	const {isFocusVisible, focusProps} = useFocusRing();
	const {inputProps, isSelected} = useCheckbox({
		'aria-label': name,
		value: value.toString(),
	}, state, ref);
	return (
		<label>
			<VisuallyHidden>
				<input {...mergeProps(inputProps, focusProps)} ref={ref}/>
				{name}
			</VisuallyHidden>
			<VisuallyHidden>
				<input {...mergeProps(inputProps, focusProps)} ref={ref}/>
				{name}
			</VisuallyHidden>
			<div
				aria-hidden='true'
				className={cx(
					'relative group rounded transition-all',
					isFocusVisible && 'ring-2 ring-stone-50',
					isSelected && 'glow-xl shadow-stone-50/20',
				)}>
				<Image
					className={cx(
						'transition-all rounded',
						isSelected && 'brightness-90 scale-[101%]',
						!isSelected && 'brightness-75 saturate-50 group-hover:brightness-90',
					)} draggable='false' width={128}
					alt={name} src={image}/>
				{isSelected ? <CheckCircle className='absolute bottom-1 right-1 fill-stone-50'/> : null}
			</div>
			{children}
		</label>
	);
}
