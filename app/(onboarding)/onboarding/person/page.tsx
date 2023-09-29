import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { redirect } from "next/navigation";
import { getPersonByAuthId } from "@/lib/getPersonByAuthId";
import PersonForm from "@/app/(onboarding)/onboarding/person/PersonForm";

export default withPageAuthRequired(
  async function Onboarding() {
    const session = await getSession();

    // session should never be null
    if (session == null) return redirect("/");

    const { user } = session;

    const person = await getPersonByAuthId(user.sub);

    return (
      <main>
        <h1 className="text-2xl text-stone-50">Datos personales</h1>
        <p className="mb-2">
          Para empezar, necesitamos unos pocos datos basicos sobre ti.
        </p>
        <PersonForm
          existingPerson={{
            familyName: person?.familyName ?? user.familyName,
            givenName: person?.givenName ?? user.givenName,
            phone: person?.phone ?? user.phone,
          }}
        />
      </main>
    );
  },
  { returnTo: "/api/auth/login" },
);
