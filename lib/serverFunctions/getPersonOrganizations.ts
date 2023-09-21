import { cache } from "react";
import { db } from "@/lib/db";
import { type Id } from "@/lib/models/schemas";
import { getPersonOrganizationRepository } from "@/lib/repositories/personOrganization";

export const revalidate = 3600;

export const getPersonOrganizations = cache(async (id: Id) => {
  return await db.task(async (t) => {
    const personsOrganizations = getPersonOrganizationRepository(t);

    return await personsOrganizations.getMany("person", id, ["organization"]);
  });
});
