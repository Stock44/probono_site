import { z } from "zod";
import { corporationType } from "@/lib/models/corporationType";
import { type ExtractModel, Schema, references } from "@/lib/models/index";

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

export const incorporatedOrgData = new Schema("IncorporatedOrgData", {
  legalConcept: z.string(),
  incorporationYear: z.number().int(),
  rfc: z.string().max(13),
  donationAuthStatus: z.nativeEnum(DonationAuthStatus),
  cluniStatus: z.nativeEnum(CLUNIStatus),
  corporationType: references(corporationType),
});

export type IncorporatedOrgData = ExtractModel<typeof incorporatedOrgData>;
