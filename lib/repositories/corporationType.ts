import { Repository } from "@/lib/repositories/index";
import { type Database } from "@/lib/db";
import { corporationType } from "@/lib/models/corporationType";

export function getCorporationTypeRepository(db: Database) {
  return new Repository(db, corporationType);
}
