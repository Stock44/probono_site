'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/button.tsx';

type AccountButtonsProps = {
    showRegisterButton?: boolean;
};

// AccountButtons.tsx
export default function AccountButtons({ onlyRegisterButton = false }) {
    return (
        <>
            {!onlyRegisterButton && (
                <Link href='/api/auth/login?returnTo=/my'>
                    <Button variant='secondary'>
                        Iniciar sesión
                    </Button>
                </Link>
            )}
            <Link href='/api/auth/signup?returnTo=/my'>
                <Button>
                    Registra tu organización
                </Button>
            </Link>
        </>
    );

}
