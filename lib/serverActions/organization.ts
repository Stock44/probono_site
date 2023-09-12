"use server";

import { type Organization } from "@/lib/model/organization";
import { type OmitMetadata } from "../model";
import { type ServerActionResult } from "@/lib/serverActions/serverActions";
import { CreationError } from "@/lib/repository/errors";
import { ZodError } from "zod";

export async function createOrganization(
  data: OmitMetadata<Organization>,
): Promise<ServerActionResult> {
  try {
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
