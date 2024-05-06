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
	Img,
	Preview,
} from '@react-email/components';

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export type OrganizationInvitationEmailProps = {
	readonly organizationLogoUrl: string;
	readonly organizationName: string;
	readonly senderName: string;
	readonly senderEmail: string;
	readonly inviteId: string;
};

export default function OrganizationInvitationEmail(
	props: OrganizationInvitationEmailProps,
) {
	const {
		organizationName,
		senderName,
		senderEmail,
		organizationLogoUrl,
		inviteId,
	} = props;
	return (
		<Html>
			<Head>
				<Font fontFamily='Sans' fallbackFontFamily='Helvetica' />
			</Head>
			<Preview>Has sido invitado a unirte a {organizationName}.</Preview>
			<Tailwind>
				<Body className='bg-stone-950 text-stone-300'>
					<Container className='mt-8 max-w-md'>
						<Section className='rounded border border-solid border-stone-800 p-8'>
							<Img
								src={`${baseUrl}/logos/geostats.png`}
								width={64}
								className='mx-auto mb-12'
							/>
							<Heading className='mb-12 max-w-sm text-center text-2xl font-normal'>
								Has sido invitado a unirte a{' '}
								<strong>{organizationName}</strong>.
							</Heading>
							<Text className='mb-12'>
								<strong>{senderName}</strong> (
								<Link href={`mailto:${senderEmail}`}>
									{senderEmail}
								</Link>
								) te ha invitado a unirte a la plataforma{' '}
								<strong>[GeoStats] Pro Bono</strong> como
								colaborador de la organización:{' '}
								<strong>{organizationName}</strong>.
								<br />
								<br />
								Al unirte, podrás modificar la información de{' '}
								<strong>{organizationName}</strong>, ayudando a
								completar el perfil de la organización dentro de
								la plataforma.
							</Text>
							<Img
								src={organizationLogoUrl}
								width={128}
								className='mx-auto'
							/>
							<Text className='mb-5 text-center text-base font-bold'>
								{organizationName}
							</Text>
							<Section className='mb-12 text-center'>
								<Button
									className='mx-auto rounded bg-stone-50 p-2 text-sm font-bold text-stone-950'
									target='_blank'
									href={`${baseUrl}/invite/${inviteId}`}
								>
									Únirme ahora
								</Button>
							</Section>
						</Section>
						<Text className='text-xs text-stone-500'>
							¿No quieres recibir más correos de{' '}
							<strong>GeoStats Pro Bono</strong>? Haz click{' '}
							<Link>aquí</Link> para bloquear nuestros correos.
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
