import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getPersonRepository } from "@/lib/repository/person";
import { getPersonOrganizationRepository } from "@/lib/repository/personOrganization";

export default withPageAuthRequired(
  async function Home() {
    const user = await getUser();

    const { personOrganizations } = await db.task(async (t) => {
      const persons = getPersonRepository(t);
      const personsOrganizations = getPersonOrganizationRepository(t);

      const person = await persons.getOne("authId", user.sub);

      if (person == null) return redirect("/onboarding");

      const personOrganizations = await personsOrganizations.getMany(
        "person",
        person.id,
        ["organization"],
      );

      return {
        personOrganizations,
      };
    });

    return (
      <div>
        {personOrganizations.length === 0 ? (
          <button>Registrar una nueva organización</button>
        ) : (
          "Hola"
        )}
        <a href={"/api/auth/login"}>Login</a>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  },
  { returnTo: "/api/auth/login" },
);
