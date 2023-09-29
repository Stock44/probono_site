import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error global has any type
  if (global.prisma == null) {
    // @ts-expect-error global has any type
    global.prisma = new PrismaClient();
  }

  // @ts-expect-error global has any type
  prisma = global.prisma;
}

export default prisma;