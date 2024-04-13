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
	Img, Preview, Column
} from '@react-email/components';

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export type OrganizationInvitationEmailProps = {
	readonly organizationLogoUrl2: string;
	readonly organizationName: string;
	readonly senderName: string;
	readonly senderEmail: string;
	readonly inviteId: string;
};

export default function OrganizationInvitationEmail(props: OrganizationInvitationEmailProps) {
	const {organizationName, senderName, senderEmail, organizationLogoUrl2, inviteId} = props;
	return (
		<Html>
			<Head>
				<Font fontFamily='Sans' fallbackFontFamily='Helvetica'/>
			</Head>
			<Preview>
				Bienvenido a <br/> {organizationName}.
			</Preview>
			<Tailwind>
				<Body className='bg-stone-950 text-stone-300'>
					<Container className="bg-white border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className='bg-white border border-solid rounded border-stone-300 p-8'>
							<Img src={organizationLogoUrl2} width={64} className='mx-auto mb-5'/>
							<Heading className='text-black font-normal text-2xl text-center max-w-sm mb-12'>
								Bienvenido a<br/><strong>{organizationName}</strong>.
							</Heading>
							<Text className='text-black mb-12'>
								 Te damos la bienvenida a <strong>{organizationName}</strong>, te invitamos a seguir colaborando en el sitio <strong>[GeoStats] Pro Bono</strong> donde 
                                 podras completar y actualizar el perfil de tu organización.
                                 <br/>
                                 <br/>
                                 Por un apoyo mayor a la comunidad.
							</Text>
							<Text className='text-black text-center text-base font-bold mb-5'>
								<strong>{organizationName}</strong>
							</Text>
						</Section>
						<Text className='text-xs text-black'>
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
	organizationLogoUrl2: 'http://localhost:3000/logos/geostats-logomark-black.png',
	inviteId: 'aaa',
	organizationName: 'GeoStats',
	senderEmail: 'hirammunozr@outlook.com',
	senderName: 'Hiram Muñoz',
} satisfies OrganizationInvitationEmailProps;

const container = {
	backgroundColor: "#fff"
  };