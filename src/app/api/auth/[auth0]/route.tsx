// Pages/api/auth/[auth0].js
import {
	type AppRouteHandlerFn, type AppRouteHandlerFnContext, getSession,
	handleAuth,
	handleLogin,
} from '@auth0/nextjs-auth0';
import {type NextRequest, NextResponse} from 'next/server';

/* eslint-disable @typescript-eslint/naming-convention */
export const GET = handleAuth({
	signup: handleLogin({
		authorizationParams: {
			screen_hint: 'signup',
		},
	}),
	// Provides an authorization endpoint in which it is required that the user reauthenticate, in order to proceed.
	async reauth(request: NextRequest, ctx: AppRouteHandlerFnContext) {
		const session = await getSession();

		if (!session) {
			return new NextResponse('Not authenticated', {
				status: 401,
			});
		}

		const handler = handleLogin({
			authorizationParams: {
				max_age: 0,
				prompt: 'login',
				connection: (session.user.sub as string).split('|')[0],
				login_hint: session.user.email as string,
			},
		});

		return handler(request, ctx);
	},
}) as AppRouteHandlerFn;
/* eslint-enable @typescript-eslint/naming-convention */
