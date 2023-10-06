'use client';
import React from 'react';
import {usePathname} from 'next/navigation';
import {useQuery} from 'react-query';
import * as Popover from '@radix-ui/react-popover';
import axios from 'axios';
import Link from 'next/link';
import {type Person, type Organization} from '@prisma/client';
import {useUser} from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import {Button} from '@/components/button.tsx';
import PersonAvatar from '@/components/person-avatar.tsx';

/**
 * Renders a widget component based on the authenticated user, that contains user-related data, such as their avatar and organization link. Rendered client-side.
 *
 * @returns The rendered user widget component.
 */
export default function UserWidget() {
	const pathname = usePathname();
	const user = useUser();

	const personQuery = useQuery(
		'person',
		async () => {
			const {data} = await axios.get<Person>('/api/auth/person');
			return data;
		},
		{
			enabled: user.user !== undefined,
			staleTime: 10 * 60 * 1000, // 10 mins,
		},
	);

	const organizationsQuery = useQuery(
		'userOrganizations',
		async () => {
			const {data} = await axios.get<Organization>(
				'/api/auth/person/organization',
			);
			return data;
		},
		{
			enabled: user.user !== undefined,
			staleTime: 10 * 60 * 1000, // 10 mins,
		},
	);

	const person = personQuery.data;

	const organization = organizationsQuery.data;

	return pathname === '/onboarding' ? null : (
		<>
			{organization === undefined ? null : (
				<Link href='/account/organization'>
					<Button variant='secondary'>
						{organization.logoUrl === null ? null : (
							<Image
								src={organization.logoUrl}
								className='rounded-sm me-1'
								height={24}
								width={24}
								alt={organization.name}
							/>
						)}
						{organization.name}
					</Button>
				</Link>
			)}
			{person === undefined ? (
				<>
					<Link href={`/api/auth/login?returnTo=${pathname}`}>
						<Button variant='secondary'>Iniciar sesión</Button>
					</Link>
					<Link href={`/api/auth/signup?returnTo=${pathname}`}>
						<Button>Registra tu organización</Button>
					</Link>
				</>
			) : (
				<Popover.Root>
					<Popover.Trigger>
						<PersonAvatar person={person}/>
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content align='end' sideOffset={8}>
							<div className='bg-stone-900 text-stone-300 border border-stone-800 rounded p-4'>
								<p className='text-sm'>Hola,</p>
								<p className='text-md mb-2'>{`${person.givenName} ${person.familyName}`}</p>
								<div className='flex gap-2'>
									<Link href='/account'>
										<Button variant='secondary'>Mi cuenta</Button>
									</Link>
									<a href='/api/auth/logout'>
										<Button variant='secondary'>Cerrar sesión</Button>
									</a>
								</div>
							</div>
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			)}
		</>
	);
}
