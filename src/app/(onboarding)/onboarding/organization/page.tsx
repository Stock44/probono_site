import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { redirect } from "next/navigation";
import OrganizationForm from "@/app/(onboarding)/onboarding/organization/OrganizationForm";
import { getPersonByAuthId } from "@/lib/getPersonByAuthId";

export default withPageAuthRequired(
  async function Onboarding() {
    const session = await getSession();

    // session should never be null
    if (session == null) return redirect("/");

    const person = await getPersonByAuthId(session.user.sub);

    if (person == null) redirect("/onboarding/person");

    return (
      <main>
        <h1 className="text-2xl text-stone-50">Datos de tu organización</h1>
        <p className="text-stone-300 mb-2">
          Tambien necesitamos algunos datos sobre tu organización.
        </p>
        <OrganizationForm />
      </main>
    );
  },
  { returnTo: "/api/auth/login" },
);
