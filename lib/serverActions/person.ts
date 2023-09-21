"use server";

import { db } from "@/lib/db";
import { getPersonRepository } from "@/lib/repository/person";
import { ZodError } from "zod";
import { CreationError } from "@/lib/repository/errors";
import { type Person } from "@/lib/models/person";
import { type ServerActionResult } from "@/lib/serverActions/serverActions";

export async function createPerson(data: Person): Promise<ServerActionResult> {
  const persons = getPersonRepository(db);

  try {
    await persons.create(data);

    return {
      success: true,
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        success: false,
        message: e.message,
      };
    }
    if (e instanceof CreationError) {
      return {
        success: false,
        message: e.message,
      };
    }
    throw e;
  }
}
