import { z } from "zod";
import { entitySchema, references } from "@/lib/model/index";
import { corporationTypeSchema } from "@/lib/model/CorporationType";

const tableName = "IncorporatedOrgData";

enum DonationAuthStatus {
  NotAuthorized = "not_authorized",
  Authorized = "authorized",
  InProgress = "in_progress",
  InRecovery = "in_recovery",
}

enum CLUNIStatus {
  No = "no",
  Active = "active",
  Inactive = "inactive",
  InProgress = "in_progress",
}

export const incorporatedOrgDataSchema = entitySchema(tableName).extend({
  legalConcept: z.string(),
  incorporationYear: z.number().int(),
  rfc: z.string().max(13),
  donationAuthStatus: z.nativeEnum(DonationAuthStatus),
  cluniStatus: z.nativeEnum(CLUNIStatus),
  corporationType: references(corporationTypeSchema),
});

export type IncorporatedOrgDataSchema = typeof incorporatedOrgDataSchema;

export type IncorporatedOrgData = z.infer<IncorporatedOrgDataSchema>;
