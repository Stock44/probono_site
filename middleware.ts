import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (session == null) return;

  if (session.user.app_metadata?.finished_onboarding !== true) {
    const url = request.nextUrl.clone();

    url.pathname = "/onboarding";

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|onboarding).*)",
};
