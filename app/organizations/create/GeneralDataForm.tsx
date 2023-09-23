"use client";
import React, { experimental_useFormStatus as useFormStatus } from "react";
import { LabeledInput } from "@/components/LabeledInput";
import { NumberInput } from "@/components/NumberInput";
import { Button } from "@/components/Button";
import ImageDropArea from "@/components/ImageDropArea";
import { createPerson } from "@/lib/serverActions/person";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { type Organization, organization } from "@/lib/models/organization";

export default function GeneralDataForm() {
  const pending = useFormStatus();

  function handleForm(formData: FormData) {
    const data: Organization = {
      name: formData.get("name") as string,
      foundingYear: formData.get("foundingYear"),
      phone: formData.get("phone"),
    };

    try {
      const organizationData = organization.parse(data);
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
        className="grow basis-9/12"
      />
      <NumberInput
        required
        name="foundingYear"
        label="Año de fundación"
        defaultValue={2023}
        className="basis-2/12"
      />
      <LabeledInput
        label="Teléfono de contacto"
        name="phone"
        type="tel"
        className="flex-initial grow basis-full sm:basis-5/12"
      />
      <LabeledInput
        label="Correo eléctronico de contacto"
        name="email"
        type="email"
        className="flex-initial grow basis-full sm:basis-5/12"
      />
      <LabeledInput
        label="Página web"
        name="webpage"
        type="url"
        className="grow basis-full"
      />

      <Button label="Confirmar" type="submit" />
    </form>
  );
}
