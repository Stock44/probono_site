"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  if (session == null) {
    redirect("/api/auth/login");
  }

  return session.user;
}
