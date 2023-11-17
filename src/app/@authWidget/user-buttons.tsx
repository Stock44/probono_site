'use client';

import {type User} from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/button.tsx';
import PopoverButtonTrigger from '@/components/popover-button-trigger.tsx';

export type UserButtonsProps = {
	readonly user?: User;
};

export default function UserButtons(props: UserButtonsProps) {
	const {user} = props;
	return (
		user === undefined
			? (
				<>
					<Link href='/api/auth/login?returnTo=/account/organization'>
						<Button variant='secondary'>Iniciar sesión</Button>
					</Link>
					<Link href='/api/auth/signup?returnTo=/account/organization'>
						<Button>Registra tu organización</Button>
					</Link>
				</>
			)
			: (
				<PopoverButtonTrigger label='Hola'>
					<div className='bg-stone-900 text-stone-300 border border-stone-800 rounded p-4'>
						<p className='text-sm'>Hola,</p>
						<p className='text-md mb-2'>{`${user.givenName} ${user.familyName}`}</p>
						<div className='flex gap-2'>
							<Link href='/account'>
								<Button variant='secondary'>Mi cuenta</Button>
							</Link>
							<a href='/api/auth/logout'>
								<Button variant='secondary'>Cerrar sesión</Button>
							</a>
						</div>
					</div>
				</PopoverButtonTrigger>
			)
	);
}
