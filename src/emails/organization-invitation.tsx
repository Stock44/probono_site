import React from 'react';
import {
	Button,
	Container,
	Font,
	Head,
	Heading,
	Html,
	Tailwind,
	Section,
	Body,
	Text,
	Link,
	Img, Preview,
} from '@react-email/components';

export const baseUrl = process.env.VERCEL_URL ?? 'http://localhost:3000';

export type OrganizationInvitationEmailProps = {
	readonly organizationLogoUrl: string;
	readonly organizationName: string;
	readonly senderName: string;
	readonly senderEmail: string;
	readonly inviteId: string;
};

export default function OrganizationInvitationEmail(props: OrganizationInvitationEmailProps) {
	const {organizationName, senderName, senderEmail, organizationLogoUrl, inviteId} = props;
	return (
		<Html>
			<Head>
				<Font fontFamily='Sans' fallbackFontFamily='Helvetica'/>
			</Head>
			<Preview>
				Has sido invitado a unirte a {organizationName}.
			</Preview>
			<Tailwind>
				<Body className='bg-stone-950 text-stone-300'>
					<Container className='max-w-md mt-8'>
						<Section className='border border-solid rounded border-stone-800 p-8'>
							<Img src={`${baseUrl}/logos/geostats.png`} width={64} className='mx-auto mb-12'/>
							<Heading className='font-normal text-2xl text-center max-w-sm mb-12'>
								Has sido invitado a unirte a <strong>{organizationName}</strong>.
							</Heading>
							<Text className='mb-12'>
								<strong>{senderName}</strong> (<Link href={`mailto:${senderEmail}`}>{senderEmail}</Link>)
								te ha invitado a unirte a la plataforma <strong>[GeoStats] Pro Bono</strong> como colaborador de la
								organización: <strong>{organizationName}</strong>.
								<br/>
								<br/>
								Al unirte, podrás modificar la información de <strong>{organizationName}</strong>, ayudando a completar el perfil
								de la organización dentro de la plataforma.
							</Text>
							<Img src={organizationLogoUrl} width={128} className='mx-auto'/>
							<Text className='text-center text-base font-bold mb-5'>
								{organizationName}
							</Text>
							<Section className='text-center mb-12'>
								<Button
									className='p-2 text-sm bg-stone-50 text-stone-950 rounded font-bold mx-auto'
									target='_blank'
									href={`${baseUrl}/invite/${inviteId}`}>
									Únirme ahora
								</Button>
							</Section>
						</Section>
						<Text className='text-xs text-stone-500'>
							¿No quieres recibir más correos de <strong>GeoStats Pro Bono</strong>? Haz click <Link>aquí</Link> para
							bloquear nuestros correos.
						</Text>
					</Container>
				</Body>

			</Tailwind>

		</Html>
	);
}

OrganizationInvitationEmail.PreviewProps = {
	organizationLogoUrl: 'http://localhost:3000/logos/geostats.png',
	inviteId: 'aaa',
	organizationName: 'GeoStats',
	senderEmail: 'hirammunozr@outlook.com',
	senderName: 'Hiram Muñoz',
} satisfies OrganizationInvitationEmailProps;
