"use client";

import React, { useState } from "react";
import Save from "@material-design-icons/svg/round/save.svg";
import { type User } from "@prisma/client";
import { type UserDelete, userDeleteSchema } from "@/lib/schemas/user.ts";
import Form, { type FormState } from "@/components/form.tsx";
import SubmitButton from "@/components/submit-button.tsx";
import TextField from "@/components/text-field.tsx";
import { formValidators } from "@/lib/form-utils.ts";
import { getSession } from "@auth0/nextjs-auth0";

export type PasswordFormProps = {
  readonly action: (
    state: FormState<UserDelete>,
    data: FormData,
  ) => Promise<FormState<UserDelete>>;
};

export default function DeleteForm(props: PasswordFormProps) {
  const { action } = props;
  const validate = formValidators(userDeleteSchema);

  return (
    <Form action={action}>
      <TextField
        isRequired
        validate={validate.password}
        label="Ingrese su contraseña actual"
        name="password"
        type="password"
        className="mb-4"
      />
      <SubmitButton icon={<Save />}>Eliminar cuenta</SubmitButton>
    </Form>
  );
}
