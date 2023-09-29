import { cache } from "react";
import prisma from "@/lib/prisma";

export const getPersonOrganizationsByAuthId = cache(async (authId: string) => {
  return prisma.person
    .findFirst({
      where: {
        authId,
      },
      include: {
        organizations: true,
      },
    })
    .organizations();
});
