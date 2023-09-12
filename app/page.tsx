import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getPersonRepository } from "@/lib/repository/person";

export default withPageAuthRequired(
  async function Home() {
    const user = await getUser();
    const personRepository = getPersonRepository(db);

    const person = await personRepository.getByAuthId(user.sub);

    if (person?.organization == null) {
      redirect("/onboarding");
    }

    return (
      <div>
        <a href={"/api/auth/login"}>Login</a>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  },
  { returnTo: "/api/auth/login" },
);
