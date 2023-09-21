import { cache } from "react";
import { db } from "@/lib/db";
import { getPersonRepository } from "@/lib/repositories/person";
import { redirect } from "next/navigation";

export const revalidate = 0;

export const getPersonByAuthId = cache(async (authId: string) => {
  const person = await db.task(async (t) => {
    const persons = getPersonRepository(t);
    return await persons.getOne("authId", authId);
  });

  if (person == null) redirect("/onboarding");

  return person;
});
