// Pages/api/auth/[auth0].js
import {
	type AppRouteHandlerFn,
	type AppRouteHandlerFnContext,
	getSession,
	handleAuth,
	handleLogin,
} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';
import {requestUserReauthentication} from '@/lib/models/user-reauthentication.ts';

/* eslint-disable @typescript-eslint/naming-convention */
export const GET = handleAuth({
	signup: handleLogin({
		authorizationParams: {
			screen_hint: 'signup',
		},
	}),
	// Provides an authorization endpoint in which it is required that the user reauthenticate, in order to proceed.
	async reauth(request: NextRequest, context: AppRouteHandlerFnContext) {
		try {
			await requestUserReauthentication();
		} catch {
			return new NextResponse('Not authenticated', {
				status: 401,
			});
		}

		const session = (await getSession())!; // Verified by requestUserReauthentication()

		let connection = (session.user.sub as string).split('|')[0];
		// If the connection name is auth0, replace it with the default connection name
		connection =
			connection === 'auth0'
				? 'Username-Password-Authentication'
				: connection;

		const handler = handleLogin({
			authorizationParams: {
				max_age: 0,
				prompt: 'login',
				login_hint: session.user.email as string,
				connection,
			},
		});

		return handler(request, context);
	},
}) as AppRouteHandlerFn;
/* eslint-enable @typescript-eslint/naming-convention */
