import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getPersonRepository } from "@/lib/repositories/person";
import { getUser } from "@/lib/auth";
import { PersonDataForm } from "@/app/onboarding/PersonDataForm";

export default withPageAuthRequired(
  async function Onboarding() {
    const user = await getUser();

    const persons = getPersonRepository(db);

    const person = await persons.getOne("authId", user.sub);

    if (person != null) {
      redirect("/");
    }

    return (
      <Suspense fallback={<p>Loading...</p>}>
        <h2 className="text-lg text-stone-950 dark:text-stone-50">
          Datos personales
        </h2>
        <PersonDataForm
          authId={user.sub}
          startingUserData={{
            givenName: user.givenName,
            familyName: user.familyName,
            email: user.email,
            phone: user.phone,
          }}
        />
      </Suspense>
    );
  },
  { returnTo: "/api/auth/login" },
);
