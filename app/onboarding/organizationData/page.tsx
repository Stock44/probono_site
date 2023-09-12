import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getPersonRepository } from "@/lib/repository/person";
import { getUser } from "@/lib/auth";

export default withPageAuthRequired(
  async function Onboarding() {
    const user = await getUser();
    const persons = getPersonRepository(db);
    const person = await persons.getByAuthId(user.sub);
    if (person == null) {
      redirect("/onboarding/personData");
    }

    return (
      <Suspense fallback={<p>Loading...</p>}>
        <h2 className="text-lg text-stone-950 dark:text-stone-50">
          Datos de la organización
        </h2>
      </Suspense>
    );
  },
  { returnTo: "/api/auth/login" },
);
