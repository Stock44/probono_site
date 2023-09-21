import { Repository } from "@/lib/repository/index";
import { organization } from "@/lib/models/organization";
import { type Database } from "@/lib/db";

export function getOrganizationRepository(db: Database) {
  return new Repository(db, organization);
}
