"use client";
import React, { useState } from "react";
import { LabeledInput } from "@/components/LabeledInput";
import { NumberInput } from "@/components/NumberInput";
import { Button } from "@/components/Button";
import ImageDropArea from "@/components/ImageDropArea";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Icon from "@/components/Icon";
import { organizationSchema } from "@/lib/schemas/organization";
import { decodeForm } from "@/lib/schemas/decodeForm";
import handleFormServerAction from "@/app/(onboarding)/onboarding/organization/handleFormServerAction";

export default function OrganizationForm() {
  const { pending } = useFormStatus();

  const [issueMap, setIssueMap] = useState(new Map<string, string>());

  async function handleForm(formData: FormData) {
    try {
      // validate that the data is correct
      await decodeForm(formData, organizationSchema.omit({ id: true }));

      const result = await handleFormServerAction(formData);

      if (result.success) {
        redirect("/account/organization");
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
    <form
      className="max-w-2xl w-full pt-4 flex flex-wrap items-end gap-x-2"
      action={handleForm}
    >
      <ImageDropArea
        label="Suelta una imagen para tu logo aquí"
        className="basis-full"
        name="logo"
        maxSize={30}
      />
      <LabeledInput
        label="Nombre"
        name="name"
        required
        issueText={issueMap.get("name")}
        className="grow basis-9/12"
      />
      <NumberInput
        required
        name="foundingYear"
        label="Año de fundación"
        defaultValue={2023}
        issueText={issueMap.get("foundingYear")}
        className="basis-2/12"
      />

      <LabeledInput
        label="Teléfono de contacto"
        name="phone"
        type="tel"
        className="flex-initial grow basis-full"
        issueText={issueMap.get("phone")}
      />
      <LabeledInput
        label="Correo eléctronico de contacto"
        name="email"
        type="email"
        className="flex-initial grow basis-full"
        issueText={issueMap.get("email")}
      />
      <LabeledInput
        label="Página web"
        name="webpage"
        type="url"
        className="grow basis-full"
        issueText={issueMap.get("webpage")}
      />

      <Button type="submit" disabled={pending}>
        Continuar <Icon iconName="navigate_next" />
      </Button>
    </form>
  );
}
