import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getPersonRepository } from "@/lib/repositories/person";
import { getSession } from "@auth0/nextjs-auth0";
import { LinkButton } from "@/components/Buttons";

export default async function Home() {
  const session = await getSession();

  if (session != null) {
    await db.task(async (t) => {
      const persons = getPersonRepository(t);

      const person = await persons.getOne("authId", session.sub);

      if (person == null) return redirect("/onboarding");
    });
  }

  return (
    <div className="w-full min-h-screen flex gap-2 items-center justify-center">
      <LinkButton href="/api/auth/login?returnTo=/">Iniciar sesión</LinkButton>
      <LinkButton href="/api/auth/logout?returnTo=/">Cerrar sesión</LinkButton>
      <LinkButton href="/organizations">Ir a organizaciones</LinkButton>
    </div>
  );
}
