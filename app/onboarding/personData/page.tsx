import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {get_user} from '@/lib/auth';
import TextInput from '@/components/TextInput';
import {db} from '@/lib/db';
import {get_person_repository} from '@/lib/db/person';
import {Suspense} from 'react';
import {redirect} from 'next/navigation';
import Button from '@/components/Button';

export default withPageAuthRequired(async function Onboarding() {
    const user = await get_user()

    const person_repo = get_person_repository(db);

    const person = await person_repo.get_by_auth_id(user.sub);

    if (person) {
        redirect('/onboarding/organizationData')
    }

    async function createPerson(formData: FormData) {
        'use server'
        const person_repo = get_person_repository(db);

        const user = await get_user()

        const person = await person_repo.create({
            auth_id: user.sub,
            given_name: formData.get('givenName') as string,
            family_name: formData.get('familyName') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
        })
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <h2 className='text-lg text-stone-950 dark:text-stone-50'>Datos personales</h2>
            <form action={createPerson}>
                <TextInput name='givenName' label='Nombre (s)' defaultValue={user.given_name}/>
                <TextInput name='familyName' label='Apellido (s)' defaultValue={user.family_name}/>
                <TextInput name='email' type='email' label='Correo' defaultValue={user.family_name}/>
                <TextInput name='phone' type='tel' label='Teléfono' defaultValue={user.family_name}/>
                <Button type='submit'> Siguiente</Button>
            </form>
        </Suspense>

    )
}, {returnTo: '/api/auth/login'})
