import {type NextRequest, NextResponse} from 'next/server';
import {getSession} from '@auth0/nextjs-auth0/edge';

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const session = await getSession(request, response);

	const section = request.nextUrl.pathname.split('/')[1];

	if (section === 'onboarding' && (session === null || session === undefined || session.user.finished_onboarding as boolean)) {
		const url = request.nextUrl.clone();

		url.pathname = '/';

		return NextResponse.redirect(url);
	}

	if (
		section !== 'onboarding'
    && (session !== null && session !== undefined && !(session.user.finished_onboarding as boolean))
	) {
		const url = request.nextUrl.clone();

		url.pathname = '/onboarding';

		return NextResponse.redirect(url);
	}

	return response;
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
