"use client";

import TextInput from "@/components/TextInput";
import { Button } from "@/components/Buttons";
import React, { useState } from "react";
import { createPerson } from "@/lib/serverActions/person";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { person, type Person } from "@/lib/models/person";
import { ZodError } from "zod";

export function PersonDataForm({
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

  const issues = new Map<string | number, string>();

  if (validationError !== null) {
    validationError.issues.forEach((issue) => {
      issues.set(issue.path[0], issue.message);
    });
  }

  async function handleForm(formData: FormData) {
    const data: Person = {
      authId,
      givenName: formData.get("givenName") as string,
      familyName: formData.get("familyName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    try {
      const personData = person.parse(data);
      const result = await createPerson(personData);
      if (result.success) {
        redirect("/");
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
        issueText={issues.get("givenName")}
        defaultValue={startingUserData.givenName}
      />
      <TextInput
        name="familyName"
        label="Apellido (s)"
        issueText={issues.get("familyName")}
        defaultValue={startingUserData.familyName}
      />
      <TextInput
        name="email"
        type="email"
        label="Correo"
        issueText={issues.get("email")}
        defaultValue={startingUserData.email}
      />
      <TextInput
        name="phone"
        type="tel"
        label="Teléfono"
        issueText={issues.get("phone")}
        defaultValue={startingUserData.phone}
      />
      <Button type="submit" disabled={pending}>
        {pending ? "loading..." : "Siguiente"}
      </Button>
    </form>
  );
}
