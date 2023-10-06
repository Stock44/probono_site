import { cache } from "react";
import prisma from "@/lib/prisma";

export const getPersonOrganizationByAuthId = cache(async (authId: string) => {
  return prisma.person
    .findFirst({
      where: {
        authId,
      },
    })
    .organization();
});
