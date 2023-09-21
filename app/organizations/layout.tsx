import React from "react";
import { getPersonOrganizations } from "@/lib/serverFunctions/getPersonOrganizations";
import { LinkButton } from "@/components/Buttons";
import { getSession } from "@auth0/nextjs-auth0";
import { getPersonByAuthId } from "@/lib/serverFunctions/getPersonByAuthId";
import { type PersonOrganization } from "@/lib/models/personOrganization";
import TextInput from "@/components/TextInput";

function OrganizationSelector({
  personOrganizations,
}: {
  personOrganizations: PersonOrganization[];
}) {
  return personOrganizations.length > 0 ? (
    <p>test</p>
  ) : (
    <LinkButton href="/organizations/create">Crear una organización</LinkButton>
  );
}

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const user =
    session != null ? await getPersonByAuthId(session.user.sub) : null;

  const personOrganizations =
    user != null ? await getPersonOrganizations(user.id) : null;

  return (
    <nav className="w-full dark:bg-stone-800 flex p-4 gap-2 justify-between">
      <p className="dark:text-stone-200 text-lg">
        geostats <span className="dark:text-stone-400"> | </span> probono
      </p>
      {personOrganizations != null ? (
        <OrganizationSelector personOrganizations={personOrganizations} />
      ) : (
        <div className="flex gap-2">
          <LinkButton href={"/api/auth/login?returnTo=/organizations"}>
            Iniciar sesión
          </LinkButton>
          <LinkButton href={"/api/auth/signup?returnTo=/onboarding"}>
            Registrarse
          </LinkButton>
        </div>
      )}
    </nav>
  );
}
