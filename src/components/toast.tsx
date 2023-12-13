'use client';
import React, {createContext, type ReactNode, useContext, useRef} from 'react';
import {type ToastState, useToastState} from '@react-stately/toast';
import {type AriaToastProps, type AriaToastRegionProps, useToast, useToastRegion} from '@react-aria/toast';
import {AnimatePresence, motion, type Variants} from 'framer-motion';
import {omit} from 'lodash';
import Close from '@material-design-icons/svg/round/close.svg';
import Button from '@/components/button.tsx';
import {cx} from '@/lib/cva.ts';

export type ToastContent = {
	variant?: 'success' | 'warn' | 'error';
	title: string;
	icon?: ReactNode;
	description?: string;
};

type ToastProps = {
	readonly state: ToastState<ToastContent>;
} & AriaToastProps<ToastContent>;

const toastVariants: Variants = {
	entering: {
		opacity: 1,
		top: 'auto',
		bottom: 'auto',
		right: 0,
	},
	initial: {
		opacity: 1,
		top: 'auto',
		bottom: 128,
		right: 0,
	},
	initialQueued: {
		opacity: 0,
		top: 256,
		right: 0,
		bottom: 'auto',
	},
	exiting: {
		right: '-110%',
	},
};

function Toast(props: ToastProps) {
	const {state, toast} = props;
	const {animation, content} = toast;
	const {title, description, icon, variant = 'success'} = content;
	const ref = useRef<HTMLDivElement>(null);
	const {
		toastProps,
		titleProps,
		descriptionProps,
		closeButtonProps,
	} = useToast(props, state, ref);

	return (
		<motion.div
			{...omit(toastProps, ['onAnimationEnd', 'onAnimationStart', 'onDragStart', 'onDragEnd', 'onDrag'])}
			ref={ref}
			layout
			initial={animation === 'queued' ? 'initialQueued' : 'initial'}
			animate='entering'
			exit='exiting'
			variants={toastVariants}
			className={cx(
				'rounded flex p-2 items-center gap-2 relative max-w-2xl',
				variant === 'success' && 'bg-green-400',
				variant === 'error' && 'bg-red-400',
				variant === 'warn' && 'bg-yellow-400',
			)}
		>
			<div>
				<div {...titleProps} className='text-stone-800 font-semibold flex gap-1'>
					{icon}
					{title}
				</div>
				{
					description && (
						<div {...descriptionProps} className='text-stone-700'>
							{description}
						</div>
					)
				}
			</div>

			{
				!toast.timeout && (<Button
					{...closeButtonProps} variant='text'
					size='xs' className={cx(
						'text-stone-800',
						variant === 'success' && 'enabled:hover:bg-green-500',
						variant === 'warn' && 'enabled:hover:bg-yellow-500',
						variant === 'error' && 'enabled:hover:bg-red-500',
					)}
				>
					<Close className='fill-current'/>
				</Button>)
			}

		</motion.div>
	);
}

type ToastRegionProps = {
	readonly state: ToastState<ToastContent>;
} & AriaToastRegionProps;

function ToastRegion(props: ToastRegionProps) {
	const {state} = props;
	const ref = useRef<HTMLDivElement>(null);

	const {regionProps} = useToastRegion(props, state, ref);
	return (
		<motion.div
			{...omit(regionProps, ['onAnimationEnd', 'onAnimationStart', 'onDragStart', 'onDragEnd', 'onDrag'])}
			ref={ref}
			layout
			className='fixed bottom-4 right-4 flex flex-col gap-4 outline-none'
		>
			<AnimatePresence>
				{
					state.visibleToasts.map(
						toast => (
							<Toast key={toast.key} toast={toast} state={state}/>
						),
					)
				}
			</AnimatePresence>
		</motion.div>
	);
}

const toastContext = createContext<ToastState<ToastContent> | null>(null);

export function useToasts() {
	const toasts = useContext(toastContext);
	if (toasts === null) {
		throw new Error('useToast must be called within a ToastProvider');
	}

	return toasts;
}

export type ToastProviderProps = {
	readonly children: ReactNode;
};

export function ToastProvider(props: ToastProviderProps) {
	const {children} = props;
	const state = useToastState<ToastContent>({
		maxVisibleToasts: 5,
	});

	return (
		<>
			<toastContext.Provider value={state}>
				{children}
			</toastContext.Provider>
			<ToastRegion {...props} state={state}/>
		</>

	);
}
