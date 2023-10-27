import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import {type DropEvent, type FileDropItem, mergeProps, useDrop, useField} from 'react-aria';
import {List} from 'immutable';
import ImageButton from '@/components/image-button.tsx';
import Button from '@/components/button.tsx';
import Icon from '@/components/icon.tsx';

const Kb = 1024;

export type ImageDropZoneProps = {
	readonly fileUrl: string | undefined;
	readonly onFileChange: (file: string | undefined) => void;
	readonly label: string;
	readonly className?: string;
	readonly maxSize?: number;
};

export default function ImageDropZone(props: ImageDropZoneProps) {
	const {fileUrl, onFileChange, label, className, maxSize} = props;

	const [errorMessage, setErrorMessage] = useState<string>();

	const ref = useRef<HTMLInputElement>(null);
	const {dropProps, isDropTarget} = useDrop({
		ref,
		onDrop(event: DropEvent) {
			const item = List(event.items).find(item => {
				if (item.kind !== 'file') {
					return false;
				}

				return item.type === 'image/jpeg' || item.type === 'image/png' || item.type === 'image/webp';
			}) as FileDropItem | undefined;

			if (item === undefined) {
				return;
			}

			(async () => {
				const file = await item.getFile();
				validateFile(file);
			})();
		},
	});

	const validateFile = (file: File) => {
		if (maxSize !== undefined && file.size > maxSize * Kb) {
			setErrorMessage(`El tamaño de la imágen no debe pasar de ${maxSize} KB`);
			return;
		}

		console.log(file);

		setErrorMessage(undefined);

		onFileChange(URL.createObjectURL(file));
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const {
		labelProps,
		fieldProps,
		errorMessageProps,
	} = useField({
		label,
		errorMessage,
	});

	return (
		<>
			<input
				ref={inputRef} type='file' className='hidden'
				onInput={event => {
					const {files} = event.currentTarget;
					if (files !== null && files.length > 0) {
						validateFile(files[0]);
					}
				}}/>
			<div
				{...mergeProps(dropProps, fieldProps)}
				className={clsx(
					'rounded relative border block mb-4 border-dashed border-stone-700 w-64 h-64',
					className,
				)}
			>
				{fileUrl === undefined ? (
					<Button
						variant='outlined'
						className='w-full h-full hover:bg-stone-800'
						onPress={() => {
							inputRef.current?.click();
						}}
					>
						<label {...labelProps} className='text-base flex flex-col gap-2 text-stone-500'>
							<Icon iconName='image'/>
							{label}
						</label>
					</Button>
				) : (
					<ImageButton
						className='w-full h-full rounded object-contain p-4'
						alt='userLogo'
						width={256}
						height={256}
						src={fileUrl}
						onPress={() => {
							inputRef.current?.click();
						}}
					/>
				)}
			</div>
			{
				errorMessage === undefined
					? null
					: <p {...errorMessageProps}>
						{errorMessage}
					</p>
			}
		</>
	);
}
