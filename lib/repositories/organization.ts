import { Repository } from "@/lib/repositories/index";
import { organization } from "@/lib/models/organization";
import { type Database } from "@/lib/db";

export function getOrganizationRepository(db: Database) {
  return new Repository(db, organization);
}
