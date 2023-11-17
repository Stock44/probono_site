'use client';

import {type User} from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/button.tsx';
import PopoverButtonTrigger from '@/components/popover-button-trigger.tsx';

export default function UserLogoutButton() {
	return (
		<Link href='/api/auth/logout?returnTo=/'>
			<Button variant='secondary'>Cerrar sesión</Button>
		</Link>
	);
}
