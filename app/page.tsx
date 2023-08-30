import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import getDb from '@/lib/db';
import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';

interface ContactData {
    id: number,
    phone: string,
    email: string,
}

interface Organization {

}

interface Person {
    id: number
    authId: string,
    orgPosition: string,
    contactData: ContactData
    organization?: Organization
}

export default withPageAuthRequired(async function Home() {
    const db = await getDb();
    const user = await getUser();

    const queryResult = await db.query('select * from Person where authId = $1', [user.sub]);

    if (queryResult.rowCount == 0) {
        redirect('/onboarding')
    }

    return <div>
        <a href={'/api/auth/login'}>Login</a>
        <a href="/api/auth/logout">Logout</a>
    </div>
}, {returnTo: '/api/auth/login'});
