import React, {type ChangeEvent, type ComponentProps, type ReactNode, useRef, useState} from 'react';
import {type FileDropItem, mergeProps, useDrop, useFocusRing} from 'react-aria';
import {type FormValidationProps, useFormValidation} from '@react-aria/form';
import {useFormValidationState} from '@react-stately/form';
import Image from 'next/image';
import {omit} from 'lodash';
import {cx} from '@/lib/cva.ts';

export type FileDropZoneProps = {
	readonly className?: string;
	readonly name?: string;
	readonly label?: ReactNode;
	readonly acceptedMimeTypes?: string[];
	readonly error?: string;
} & FormValidationProps<File | undefined> & Omit<ComponentProps<'input'>, 'type' | 'accept' | 'ref'>;

const Kb = 1024;

const imageMimeTypes = new Set<string>(['image/png', 'image/jpg', 'image/jpeg', 'image/webp']);

export default function FileDropZone(props: FileDropZoneProps) {
	const {label, className, acceptedMimeTypes, error} = props;

	const [file, setFile] = useState<File>();

	const state = useFormValidationState({
		validationBehavior: 'native',
		...props,
		value: file,
	});

	const {commitValidation} = state;

	const {isInvalid, validationErrors} = state.displayValidation;

	const inputRef = useRef<HTMLInputElement>(null);

	useFormValidation<File>(props, state, inputRef);

	const ref = useRef<HTMLDivElement>(null);

	const {isFocusVisible, focusProps} = useFocusRing();

	const {dropProps, isDropTarget} = useDrop({
		ref,
		onDrop(event) {
			const item = event.items.find(item => item.kind === 'file') as FileDropItem | undefined;
			if (item === undefined) {
				return;
			}

			(
				async () => {
					const file = await item.getFile();
					setFile(file);
					commitValidation();
				}
			)();
		},
	});

	const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (props.onChange) {
			props.onChange(event);
		}

		if (event.target.files === null || event.target.files.length === 0) {
			return;
		}

		setFile(event.target.files[0]);
		commitValidation();
	};

	const dropZoneClickHandler = () => {
		const input = inputRef.current;
		if (input !== null) {
			input.click();
		}
	};

	return (
		<div
			{...mergeProps(dropProps, focusProps)}
			ref={ref}
			role='button'
			tabIndex={0}
			className={cx(
				'rounded border border-dashed border-stone-500 p-4 text-stone-500 hover:bg-stone-800 outline-none flex flex-col justify-center items-center text-center',
				isDropTarget && 'bg-stone-800',
				isFocusVisible && 'border-stone-50',
				className,
			)}
			onClick={dropZoneClickHandler}
		>
			<input
				{...omit(props, ['className'])}
				ref={inputRef}
				type='file' className='hidden'
				accept={acceptedMimeTypes?.join(',')}
				onChange={inputChangeHandler}
			/>
			{!isInvalid && file && imageMimeTypes.has(file.type) && <Image src={URL.createObjectURL(file)} alt='Submitted image' height={128} width={128}/>}
			<div className='text-stone-500 mt-2'>
				{
					file
						? file.name
						: label
				}
			</div>

			{
				(error ?? isInvalid) && (
					<div className='text-red-400 mt-2'>
						{error ?? validationErrors.join(' ')}
					</div>
				)
			}

		</div>
	);
}
