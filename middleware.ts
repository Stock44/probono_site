import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (session == null) return;

  const section = request.nextUrl.pathname.split("/")[1];

  console.log(session.user);

  if (section === "onboarding" && session.user.finished_onboarding === true) {
    const url = request.nextUrl.clone();

    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  if (section !== "onboarding" && session.user.finished_onboarding === false) {
    const url = request.nextUrl.clone();

    url.pathname = "/onboarding";

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
