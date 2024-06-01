'use client';
import React, {type ReactNode, useState} from 'react';
import ArrowDropDown from '@material-design-icons/svg/round/arrow_drop_down.svg';
import ArrowDropUp from '@material-design-icons/svg/round/arrow_drop_up.svg';
import {AnimatePresence, motion} from 'framer-motion';
import {cx} from './cva.ts';

export type DropdownProps = BaseDropdownProps | StatefulDropDownProps;

export function Dropdown(props: DropdownProps) {
	return 'isOpen' in props ? (
		<BaseDropdown {...props} />
	) : (
		<StatefulDropDown {...props} />
	);
}

export type StatefulDropDownProps = Omit<
	BaseDropdownProps,
	'isOpen' | 'onToggle'
> & {
	readonly isInitiallyOpen?: boolean;
};

export function StatefulDropDown(props: StatefulDropDownProps) {
	const {isInitiallyOpen = false} = props;
	const [isOpen, setIsOpen] = useState(isInitiallyOpen);
	return <BaseDropdown isOpen={isOpen} onToggle={setIsOpen} {...props} />;
}

export type BaseDropdownProps = {
	readonly isOpen: boolean;
	readonly onToggle: (isOpen: boolean) => void;
	readonly label: ReactNode;
	readonly children: ReactNode;
	readonly className?: string;
};

export function BaseDropdown(props: BaseDropdownProps) {
	const {isOpen, onToggle, label, children, className} = props;

	return (
		<div
			className={cx(
				'overflow-hidden rounded border border-stone-800',
				className,
			)}
		>
			<div
				className='flex cursor-pointer border-b border-stone-800 p-2 font-bold text-stone-50 transition-colors hover:bg-stone-900'
				onClick={() => {
					onToggle(!isOpen);
				}}
			>
				<div className='grow'>{label}</div>
				{isOpen ? (
					<ArrowDropUp className='fill-current' />
				) : (
					<ArrowDropDown className='fill-current' />
				)}
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						layout
						className='p-2 text-stone-300'
						initial={{
							height: 0,
						}}
						animate={{
							height: 'auto',
						}}
						exit={{
							height: 0,
						}}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
