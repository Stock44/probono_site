'use server'

import {getSession, updateSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';

interface UserUpdate {
    given_name?: string,
    family_name?: string,
}

export async function getUser() {
    const session = await getSession();
    if (!session) {
        redirect('/api/auth/login')
    }

    return session.user
}

export async function updateUser(userUpdate: UserUpdate) {
    const session = await getSession();
    if (!session) {
        redirect('/api/auth')
    }

    let name = undefined;

    if (userUpdate.family_name && userUpdate.given_name) {
        name = userUpdate.given_name + userUpdate.family_name;
    }

    return updateSession({
        ...session,
        user: {
            ...session.user,
            ...userUpdate,
            name,
        }
    })
}
