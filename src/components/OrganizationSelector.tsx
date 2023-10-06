import { LinkButton } from "@/components/LinkButton";
import React from "react";

export function OrganizationSelector({
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
