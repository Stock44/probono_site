import React, {type ComponentProps, Suspense} from 'react';
import {cx} from '@/lib/cva.ts';

type IconProps = {
	readonly name: string;
	readonly weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	readonly isFilled?: boolean;
	readonly grade?: -25 | 0 | 200;
	readonly size?: 'sm' | 'md' | 'lg' | 'xl';
	readonly className?: string;
} & ComponentProps<'div'>;

async function ServerIcon(props: IconProps) {
	const {name, className, weight = 400, grade = 0, isFilled = true, size = 'md'} = props;
	let properties = '';

	if (weight === 400 && grade === 0 && !isFilled) {
		properties = 'default';
	} else {
		if (weight !== 400) {
			properties += 'wght' + weight;
		}

		if (grade) {
			properties += 'grad' + grade.toString().replace('-', 'N');
		}

		if (isFilled) {
			properties += 'fill1';
		}
	}

	const opticalSize = {
		sm: 20,
		md: 24,
		lg: 40,
		xl: 48,
	}[size];

	const src = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/${name}/${properties}/${opticalSize}px.svg`;

	const response = await fetch(src);
	if (!(response.ok && response.status >= 200 && response.status < 300)) {
		throw new Error('unknown icon specified');
	}

	return (
		<div
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: await response.text(),
			}}
			className={className}
		/>
	);
}

export default function Icon(props: IconProps) {
	const {size = 'md', className} = props;
	return (
		<Suspense fallback={<div className={cx(
			'animate-pulse flex items-center justify-center',
			size === 'sm' && 'w-5 h-5',
			size === 'md' && 'w-6 h-6',
			size === 'lg' && 'w-10 h-10',
			size === 'xl' && 'w-12 h-12',
			className,
		)}/>}>
			<ServerIcon {...props}/>
		</Suspense>
	);
}
