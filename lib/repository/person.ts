import { person } from "@/lib/models/person";
import { type Database } from "@/lib/db";
import { Repository } from "@/lib/repository/index";

export function getPersonRepository(db: Database) {
  return new Repository(db, person);
}
