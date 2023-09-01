'use server'

import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';

export async function get_user() {
    const session = await getSession();
    if (!session) {
        redirect('/api/auth/login')
    }

    return session.user
}
