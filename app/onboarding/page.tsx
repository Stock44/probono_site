import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getUser} from '@/lib/auth';
import TextInput from '@/components/TextInput';

export default withPageAuthRequired(async function Onboarding() {
    const user = await getUser()

    return (
        <>
            <h2 className='text-lg'>Datos de contacto</h2>
            <p className='text-sm'>Sí te saltas esta parte, no apareceran tus datos de contacto en la pagina de tu
                organización.</p>
            <form>
                <TextInput label='Nombre'/>
                <TextInput label='Número de teléfono' type='tel'/>
                <TextInput label='Correo electrónico' type='email'/>
            </form>
        </>

    )
}, {returnTo: '/api/auth/login'})
