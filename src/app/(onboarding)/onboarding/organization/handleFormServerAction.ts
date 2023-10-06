"use server";
import { type ServerActionResult } from "@/lib/serverActions/serverActionResult";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { decodeForm } from "@/lib/schemas/decodeForm";
import { getPersonByAuthId } from "@/lib/getPersonByAuthId";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { organizationSchema } from "@/lib/schemas/organization";
import { management } from "@/lib/auth0";
import { fileTypeFromBlob } from "file-type";
import { randomUUID } from "crypto";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export default async function handleFormServerAction(
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

  const person = await getPersonByAuthId(session.user.sub);

  if (person == null) {
    return {
      success: false,
      name: "user data missing",
      message: "onboarding has not been completed",
    };
  }

  try {
    const organizationData = await decodeForm(
      data,
      organizationSchema.omit({ id: true }),
    );

    const logo = data.get("logo") as File;
    const logoFileType = await fileTypeFromBlob(logo);

    let logoUrl: string | undefined;

    if (logoFileType != null) {
      if (!imageTypes.includes(logoFileType.mime)) {
        return {
          success: false,
          name: "wrong file type",
          message: "file is not a supported image format",
        };
      }

      const result = await put(`organizationLogos/${randomUUID()}`, logo, {
        access: "public",
        contentType: logoFileType.mime,
      });

      logoUrl = result.url;
    }

    await prisma.organization.create({
      data: {
        ...organizationData,
        logoUrl,
        owner: {
          connect: {
            id: person.id,
          },
        },
      },
    });

    await management.users.update(
      {
        id: session.user.sub,
      },
      {
        app_metadata: {
          finished_onboarding: true,
        },
      },
    );

    await updateSession({
      ...session,
      user: {
        ...session.user,
        finished_onboarding: true,
      },
    }); // Add this to update the session

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
