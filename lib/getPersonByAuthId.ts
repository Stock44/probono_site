import { cache } from "react";
import prisma from "@/lib/prisma";

export const revalidate = 1800;

export const getPersonByAuthId = cache(async (authId: string) => {
  return prisma.person.findFirst({
    where: {
      authId,
    },
  });
});
