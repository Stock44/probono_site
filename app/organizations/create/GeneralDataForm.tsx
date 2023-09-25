"use client";
import React, { useState } from "react";
import { LabeledInput } from "@/components/LabeledInput";
import { NumberInput } from "@/components/NumberInput";
import { Button } from "@/components/Button";
import ImageDropArea from "@/components/ImageDropArea";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { organization } from "@/lib/models/organization";
import { createOrganization } from "@/lib/serverActions/organization";
import { type Person } from "@/lib/models/person";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function GeneralDataForm({ person }: { person: Person }) {
  const { pending } = useFormStatus();

  const [validationError, setValidationError] = useState<ZodError | null>(null);

  const issues = new Map<string | number, string>();

  if (validationError !== null) {
    validationError.issues.forEach((issue) => {
      issues.set(issue.path[0], issue.message);
    });
  }

  async function handleForm(formData: FormData) {
    console.log(formData.get("logo"));
    const name = formData.get("name") as string;
    const foundingYear = formData.get("foundingYear") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const webpage = formData.get("webpage") as string;
    const position = formData.get("position") as string;
    const logoData = await (formData.get("logo") as File).text();
    const data = {
      name,
      foundingYear: Number.parseInt(foundingYear),
      phone: phone === "" ? undefined : phone,
      email: email === "" ? undefined : email,
      webpage: webpage === "" ? undefined : webpage,
    };

    try {
      organization.parse(data);
      const result = await createOrganization(person, data, position, logoData);
      if (result.success) {
        redirect("/");
      } else {
        console.error(result);
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
    <form
      className="max-w-2xl w-full pt-4 flex flex-wrap items-end gap-x-2 mb-32"
      action={handleForm}
    >
      <h1 className="text-4xl basis-full mb-2">Registra tu organización</h1>
      <h2 className="text-2xl w-fit mb-2"> Datos generales </h2>
      <p className="text-xs text-stone-300 shrink basis-8/12 mb-2">
        * marca un campo requerido
      </p>
      <ImageDropArea
        label="Suelta una imagen para tu logo aquí"
        className="basis-full"
        name="logo"
        maxSize={15}
      />
      <LabeledInput
        label="Nombre"
        name="name"
        required
        issueText={issues.get("name")}
        className="grow basis-9/12"
      />
      <NumberInput
        required
        name="foundingYear"
        label="Año de fundación"
        defaultValue={2023}
        issueText={issues.get("foundingYear")}
        className="basis-2/12"
      />
      <LabeledInput
        required
        name="position"
        label="Tu posición en la organización"
      />
      <LabeledInput
        label="Teléfono de contacto"
        name="phone"
        type="tel"
        className="flex-initial grow basis-full sm:basis-5/12"
        issueText={issues.get("phone")}
      />
      <LabeledInput
        label="Correo eléctronico de contacto"
        name="email"
        type="email"
        className="flex-initial grow basis-full sm:basis-5/12"
        issueText={issues.get("email")}
      />
      <LabeledInput
        label="Página web"
        name="webpage"
        type="url"
        className="grow basis-full"
        issueText={issues.get("webpage")}
      />

      <Button label="Confirmar" type="submit" disabled={pending} />
    </form>
  );
}
