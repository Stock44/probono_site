"use client";
import React, { useState } from "react";
import { type Person } from ".prisma/client";
import { LabeledInput } from "@/components/LabeledInput";
import handlePersonForm from "@/lib/serverActions/handlePersonForm";
import { Button } from "@/components/Button";
import Icon from "@/components/Icon";
import { redirect } from "next/navigation";
import { decodeForm } from "@/lib/schemas/decodeForm";
import { personSchema } from "@/lib/schemas/person";
import { ZodError } from "zod";

export default function PersonForm({
  existingPerson,
}: {
  existingPerson?: Partial<Person>;
}) {
  const [issueMap, setIssueMap] = useState(new Map<string, string>());

  async function handleForm(form: FormData) {
    try {
      // validate that the data is correct
      await decodeForm(
        form,
        personSchema.omit({ id: true, email: true, authId: true }),
      );

      const result = await handlePersonForm(form);

      if (result.success) {
        redirect("/onboarding/organization");
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setIssueMap(
          new Map(
            e.issues.map((issue) => {
              return [issue.path[0].toString(), issue.message];
            }),
          ),
        );
      } else {
        throw e;
      }
    }
  }

  return (
    <>
      <form action={handleForm} className="w-full">
        <LabeledInput
          required
          name="givenName"
          label="Nombre (s)"
          issueText={issueMap.get("givenName")}
          defaultValue={existingPerson?.givenName}
        />
        <LabeledInput
          required
          name="familyName"
          label="Apellido (s)"
          issueText={issueMap.get("familyName")}
          defaultValue={existingPerson?.familyName}
        />
        <LabeledInput
          name="phone"
          type="tel"
          label="Teléfono"
          issueText={issueMap.get("phone")}
          defaultValue={existingPerson?.phone}
        />
        <Button type="submit">
          Continuar <Icon iconName="navigate_next" />
        </Button>
      </form>
    </>
  );
}
