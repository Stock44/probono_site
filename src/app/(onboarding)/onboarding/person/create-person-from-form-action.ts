"use server";
import { getSession } from "@auth0/nextjs-auth0";
import { type ServerActionResult } from "@/lib/server-action-result.ts";
import { decodeForm } from "@/lib/schemas/decode-form.ts";
import { personSchema } from "@/lib/schemas/person.ts";
import { getPersonByAuthId } from "@/lib/get-person-by-auth-id.ts";
import prisma from "@/lib/prisma.ts";

/**
 * Handles the form submission for adding or updating a person.
 *
 * @param {FormData} data - The form data containing the person information.
 * @returns {Promise<ServerActionResult>} - A promise that resolves to the server action result object.
 */
export default async function createPersonFromFormAction(
  data: FormData,
): Promise<ServerActionResult> {
  const session = await getSession();

  if (session === null || session === undefined) {
    return {
      success: false,
      name: "Not authenticated error",
      message: "No user session available",
    };
  }

  try {
    data.set("authId", session.user.sub as string);
    data.set("email", session.user.email as string);
    const personData = await decodeForm(data, personSchema.omit({ id: true }));

    const person = await getPersonByAuthId(session.user.sub as string);

    if (person === null) {
      await prisma.person.create({
        data: personData,
      });
    } else {
      await prisma.person.update({
        where: {
          id: person.id,
        },
        data: personData,
      });
    }

    // Await management.users.update(
    //   {
    //     id: session.user.sub,
    //   },
    //   {
    //     app_metadata: {
    //       finished_onboarding: true,
    //     },
    //   },
    // );

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        name: error.name,
        message: error.message,
      };
    }

    throw error;
  }
}
