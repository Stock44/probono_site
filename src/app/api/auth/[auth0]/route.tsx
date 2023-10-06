// Pages/api/auth/[auth0].js
import {
	type AppRouteHandlerFn,
	handleAuth,
	handleLogin,
} from '@auth0/nextjs-auth0';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = handleAuth({
	// eslint-disable-next-line @typescript-eslint/naming-convention
	signup: handleLogin({authorizationParams: {screen_hint: 'signup'}}),
}) as AppRouteHandlerFn;
