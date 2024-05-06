import React from 'react';
import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {
	consumeOrganizationInvitation,
	isInvitationValid,
} from '@/lib/models/organization-invitation.ts';
import LinkButton from 'geostats-ui/button/link-button.tsx';
import {getUserFromSession} from '@/lib/models/user.ts';

export type InvitePageProps = {
	readonly params: {
		readonly inviteId: string;
	};
};

export default async function InvitePage(props: InvitePageProps) {
	const {params} = props;

	const valid = await isInvitationValid(params.inviteId);

	if (valid) {
		const session = await getSession();

		if (!session) {
			redirect(`/api/auth/signup?returnTo=/invite/${params.inviteId}`);
		}

		const user = await getUserFromSession();

		if (user) {
			await consumeOrganizationInvitation(params.inviteId, user.id);
			redirect('/my');
		}

		redirect(`/onboarding/organization?inviteId=${params.inviteId}`);
	}

	return (
		<div className='flex size-full items-center justify-center'>
			<div className='mt-32 w-fit max-w-96 border border-stone-800 p-8 text-stone-300'>
				<h1 className='mb-4 text-3xl'>Invitación inválida</h1>
				<p className='mb-4'>
					Esta invitación ya no es válida. Para unirte a la
					organización, consigue otra invitación.
				</p>
				<LinkButton href='/' variant='secondary'>
					Volver al inicio
				</LinkButton>
			</div>
		</div>
	);
}
