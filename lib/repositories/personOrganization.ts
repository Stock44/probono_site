import { type Database } from "@/lib/db";
import { Repository } from "@/lib/repositories/index";
import { personOrganization } from "@/lib/models/personOrganization";

export function getPersonOrganizationRepository(db: Database) {
  return new Repository(db, personOrganization);
}
