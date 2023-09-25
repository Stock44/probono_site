"use server";

import { type Organization } from "@/lib/models/organization";
import { getOrganizationRepository } from "@/lib/repositories/organization";
import { db } from "@/lib/db";
import { getPersonOrganizationRepository } from "@/lib/repositories/personOrganization";
import { type Person } from "@/lib/models/person";
import { type ServerActionResult } from "@/lib/serverActions/index";
import { put, del } from "@vercel/blob";

export async function createOrganization(
  owner: Person,
  organizationData: Omit<Organization, "id">,
  position: string,
  logoData?: string,
): Promise<ServerActionResult> {
  let logoUrl: string | null = null;
  const logo = new Blob([logoData ?? ""]);
  try {
    await db.tx(async (t) => {
      const organizations = getOrganizationRepository(t);
      const personsOrganizations = getPersonOrganizationRepository(t);

      const createdOrg = await organizations.create(organizationData);

      if (logo.size > 0) {
        const { url } = await put(`logos/org_${createdOrg.id}`, logo, {
          access: "public",
        });

        logoUrl = url;

        await organizations.update(createdOrg.id, {
          logoUrl,
        });
      }

      await personsOrganizations.create({
        person: owner,
        organization: createdOrg,
        position,
      });
    });
    return {
      success: true,
    };
  } catch (e) {
    if (logoUrl != null) {
      await del(logoUrl);
    }

    return {
      success: false,
      message: e instanceof Error ? e.message : "unknown error",
    };
  }
}
