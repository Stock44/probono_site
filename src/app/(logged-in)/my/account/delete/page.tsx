import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import Deleteform from "./delete-form";
("@/app/(logged-in)/my/account/password/password-form.tsx");
import { type UserDelete, userDeleteSchema } from "@/lib/schemas/user";
import { type FormState } from "@/components/form.tsx";
import { decodeForm } from "@/lib/form-utils.ts";
import { handleActionError } from "@/lib/handle-action-error.ts";
import { authentication } from "@/lib/auth0.ts";
import { deleteUser } from "@/lib/models/user.ts";

export default async function AccountPage() {
  const session = await getSession();
  if (
    !session ||
    !session.user ||
    !session.user.sub ||
    !session.user.sub.includes("auth0")
  ) {
    redirect("/my/account");
  }

  const action = async (
    state: FormState<UserDelete>,
    data: FormData,
  ): Promise<FormState<UserDelete>> => {
    "use server";
    try {
      const parsedData = await decodeForm(data, userDeleteSchema);

      await authentication.oauth.passwordGrant({
        username: session.user.email as string,
        password: parsedData.password,
      });

      await deleteUser(session.user.sub);
    } catch (error) {
      console.log(session.user);
      console.log(error);
      return handleActionError(state, error);
    }

    redirect("/");
  };

  return (
    <main>
      <h1 className="text-stone-200 text-4xl mb-2">Eliminacion de cuenta</h1>
      <Deleteform action={action} />
    </main>
  );
}
