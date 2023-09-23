import { cache } from "react";
import { db } from "@/lib/db";
import { getCorporationTypeRepository } from "@/lib/repositories/corporationType";

export const revalidate = 86400;

export const getAllCorporationTypes = cache(async () => {
  return await db.task(async (t) => {
    const corporationTypes = getCorporationTypeRepository(t);
    return await corporationTypes.getMany();
  });
});
