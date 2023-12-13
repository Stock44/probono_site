'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/button.tsx';

export default function AccountButtons() {
	return (
		<>
			<Link href='/api/auth/login?returnTo=/my'>
				<Button variant='secondary'>
					Iniciar sesión
				</Button>
			</Link>
			<Link href='/api/auth/signup?returnTo=/my'>
				<Button>
					Registra tu organización
				</Button>
			</Link>
		</>

	);
}
