import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { type NextRequest, NextResponse } from "next/server";
import { getPersonOrganizationsByAuthId } from "@/lib/getPersonOrganizationsByAuthId";

export const GET = withApiAuthRequired(async (request: NextRequest) => {
  const session = await getSession();

  // session shouldn't be null, as this route is protected
  if (session == null) {
    return new NextResponse("session error", {
      status: 500,
    });
  }

  const organizations = await getPersonOrganizationsByAuthId(session.user.sub);

  if (organizations == null) {
    return new NextResponse("person for this user not created yet", {
      status: 404,
    });
  }

  return NextResponse.json(organizations);
});
