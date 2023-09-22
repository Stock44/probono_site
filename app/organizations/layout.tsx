import React from "react";
import { getPersonOrganizations } from "@/lib/serverFunctions/getPersonOrganizations";
import { LinkButton } from "@/components/Buttons";
import { getSession } from "@auth0/nextjs-auth0";
import { getPersonByAuthId } from "@/lib/serverFunctions/getPersonByAuthId";
import { type PersonOrganization } from "@/lib/models/personOrganization";
import TopBar from "@/components/TopBar";
import PersonWidget from "@/components/PersonWidget";

function OrganizationSelector({
  personOrganizations,
}: {
  personOrganizations: PersonOrganization[];
}) {
  return personOrganizations.length > 0 ? (
    <p>test</p>
  ) : (
    <LinkButton
      href="/organizations/create"
      label="Registra tu organización"
      iconName="add"
    />
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
    <>
      <TopBar.Root>
        <TopBar.Navbar links={[["Organizaciones", "/organizations"]]} />
        <TopBar.Toolbar>
          {personOrganizations != null ? (
            <>
              <OrganizationSelector personOrganizations={personOrganizations} />
              <PersonWidget />
            </>
          ) : (
            <></>
          )}
        </TopBar.Toolbar>
      </TopBar.Root>
      {children}
    </>
  );
}
