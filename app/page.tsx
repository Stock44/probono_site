import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {db} from '@/lib/db';
import {redirect} from 'next/navigation';
import {get_user} from '@/lib/auth';
import {get_person_repository} from '@/lib/db/person';


export default withPageAuthRequired(async function Home() {
    const user = await get_user();
    const personRepository = get_person_repository(db);

    const person = await personRepository.get_by_auth_id(user.sub)

    if (!person) {
        redirect('/onboarding')
    }

    return <div>
        <a href={'/api/auth/login'}>Login</a>
        <a href="/api/auth/logout">Logout</a>
    </div>
}, {returnTo: '/api/auth/login'});
