import React from "react";
import Avatar from "@radix-ui/react-avatar";
import { getSession } from "@auth0/nextjs-auth0";
import { getPersonByAuthId } from "@/lib/serverFunctions/getPersonByAuthId";
import { LoginButton, SignupButton } from "@/components/ReturnSessionButtons";
import PersonAvatar from "@/components/PersonAvatar";
import Link from "next/link";

export default async function PersonWidget() {
  const session = await getSession();

  const person =
    session != null ? await getPersonByAuthId(session.user.sub) : null;

  return (
    <>
      {person != null ? (
        <Link href="/account">
          <PersonAvatar person={person} />
        </Link>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
    </>
  );
}
