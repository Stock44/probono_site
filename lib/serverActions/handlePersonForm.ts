"use server";
import { type ServerActionResult } from "@/lib/serverActions/serverActionResult";
import { getSession } from "@auth0/nextjs-auth0";
import { decodeForm } from "@/lib/schemas/decodeForm";
import { personSchema } from "@/lib/schemas/person";
import { getPersonByAuthId } from "@/lib/getPersonByAuthId";
import prisma from "@/lib/prisma";

/**
 * Handles the form submission for adding or updating a person.
 *
 * @param {FormData} data - The form data containing the person information.
 * @returns {Promise<ServerActionResult>} - A promise that resolves to the server action result object.
 */
export default async function handlePersonForm(
  data: FormData,
): Promise<ServerActionResult> {
  const session = await getSession();

  if (session == null) {
    return {
      success: false,
      name: "Not authenticated error",
      message: "No user session available",
    };
  }

  try {
    data.set("authId", session.user.sub);
    data.set("email", session.user.email);
    const personData = await decodeForm(data, personSchema.omit({ id: true }));

    const person = await getPersonByAuthId(session.user.sub);

    if (person != null) {
      await prisma.person.update({
        where: {
          id: person.id,
        },
        data: personData,
      });
    } else {
      await prisma.person.create({
        data: personData,
      });
    }

    // await management.users.update(
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
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        name: e.name,
        message: e.message,
      };
    }

    throw e;
  }
}
