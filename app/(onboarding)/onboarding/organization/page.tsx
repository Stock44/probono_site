import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { LabeledInput } from "@/components/LabeledInput";
import { type ServerActionResult } from "@/lib/serverActions/serverActionResult";
import prisma from "@/lib/prisma";
import { personSchema } from "@/lib/schemas/person";
import { decodeForm } from "@/lib/schemas/decodeForm";
import { getPersonByAuthId } from "@/lib/getPersonByAuthId";
import { management } from "@/lib/auth0";

export default withPageAuthRequired(
  async function Onboarding() {
    const session = await getSession();

    // session should never be null
    if (session == null) return redirect("/");

    const { user } = session;

    const person = await getPersonByAuthId(user.sub);

    async function handleForm(data: FormData): Promise<ServerActionResult> {
      "use server";
      const session = await getSession();

      if (session == null) {
        return {
          success: false,
          name: "Not authenticated error",
          message: "No user session available",
        };
      }

      const person = await getPersonByAuthId(session.user.sub);

      try {
        data.set("authId", session.user.sub);
        const personData = await decodeForm(data, personSchema);

        await prisma.person.upsert({
          where: {
            id: person?.id,
          },
          update: personData,
          create: personData,
        });

        const user = await management.users.update(
          {
            id: session.user.sub,
          },
          {
            app_metadata: {
              finished_onboarding: true,
            },
          },
        );

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

    return (
      <Suspense fallback={<p>Loading...</p>}>
        <h2 className="text-lg text-stone-950 dark:text-stone-50">
          Datos personales
        </h2>
        <form action={handleForm} className="w-full">
          <LabeledInput
            required
            name="givenName"
            label="Nombre (s)"
            defaultValue={person?.givenName ?? user.givenName}
          />
          <LabeledInput
            required
            name="familyName"
            label="Apellido (s)"
            defaultValue={person?.familyName ?? user.familyName}
          />
          <LabeledInput
            required
            name="phone"
            type="tel"
            label="Teléfono"
            defaultValue={person?.phone}
          />
          <Button type="submit"> Confirmar </Button>
        </form>
      </Suspense>
    );
  },
  { returnTo: "/api/auth/login" },
);
