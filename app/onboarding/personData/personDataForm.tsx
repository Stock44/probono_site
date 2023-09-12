"use client";

import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import React, { useState } from "react";
import { createPerson } from "@/lib/serverActions/person";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { validatePerson } from "@/lib/model/person";
import { ZodError } from "zod";

export async function PersonDataForm({
  authId,
  startingUserData,
}: {
  authId: string;
  startingUserData: {
    givenName: string;
    familyName: string;
    email: string;
    phone: string;
  };
}) {
  const { pending } = useFormStatus();

  const [validationError, setValidationError] = useState<ZodError | null>(null);

  const issues: Record<string, string> = {};

  if (validationError !== null) {
    validationError.issues.forEach((issue) => {
      issues[issue.path[0]] = issue.message;
    });
  }

  async function handleForm(formData: FormData) {
    const data = {
      authId,
      givenName: formData.get("givenName") as string,
      familyName: formData.get("familyName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: null,
      orgPosition: null,
    };

    try {
      const personData = validatePerson(data);
      const result = await createPerson(personData);
      if (result.success) {
        redirect("/onboarding/organizationData");
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setValidationError(e);
      } else {
        throw e;
      }
    }
  }

  return (
    <form action={handleForm}>
      <TextInput
        name="givenName"
        label="Nombre (s)"
        issueText={issues.givenName}
        defaultValue={startingUserData.givenName}
      />
      <TextInput
        name="familyName"
        label="Apellido (s)"
        issueText={issues.familyName}
        defaultValue={startingUserData.familyName}
      />
      <TextInput
        name="email"
        type="email"
        label="Correo"
        issueText={issues.email}
        defaultValue={startingUserData.email}
      />
      <TextInput
        name="phone"
        type="tel"
        label="Teléfono"
        issueText={issues.phone}
        defaultValue={startingUserData.phone}
      />
      <Button type="submit" disabled={pending}>
        {pending ? "loading..." : "Siguiente"}
      </Button>
    </form>
  );
}
