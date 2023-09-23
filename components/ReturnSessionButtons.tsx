"use client";

import { LinkButton } from "@/components/LinkButton";
import React from "react";
import { usePathname } from "next/navigation";

export function LoginButton() {
  const pathname = usePathname();
  return (
    <LinkButton
      href={`/api/auth/login?returnTo=${pathname}`}
      label="Iniciar sesión"
    />
  );
}
export function SignupButton() {
  const pathname = usePathname();
  return (
    <LinkButton
      href={`/api/auth/signup?returnTo=${pathname}`}
      label="Registrarse"
    />
  );
}
