import { z } from "zod";
import { Schema, references, type InferEntity } from "@/lib/models/index";
import { phoneSchema } from "@/lib/models/schemas";
import { employeeCountCategory } from "@/lib/models/employeeCountCategory";
import { volunteerCountCategory } from "@/lib/models/volunteerCountCategory";
import { workplaceType } from "@/lib/models/workplaceType";
import { incomeCategory } from "@/lib/models/incomeCategory";
import { address } from "@/lib/models/address";
import { corporationType } from "@/lib/models/corporationType";
import { unincorporatedOrgCategory } from "@/lib/models/unincorporatedOrgCategory";

export enum DonationAuthStatus {
  NotAuthorized = "not_authorized",
  Authorized = "authorized",
  InProgress = "in_progress",
  InRecovery = "in_recovery",
}

export enum CLUNIStatus {
  No = "no",
  Active = "active",
  Inactive = "inactive",
  InProgress = "in_progress",
}

export const organization = new Schema("Organization", {
  name: z.string(),
  employeeCountCategory: references(employeeCountCategory, true),
  ods: z.number().int().min(1).max(17).nullish(),
  foundingYear: z.number().int(),
  hasInvestmentAgreement: z.boolean().nullish(),
  phone: phoneSchema.nullish(),
  email: z.string().email().nullish(),
  webpage: z.string().url().nullish(),
  facebook: z.string().url().nullish(),
  instagram: z.string().url().nullish(),
  twitter: z.string().url().nullish(),
  tiktok: z.string().url().nullish(),
  youtube: z.string().url().nullish(),
  linkedin: z.string().url().nullish(),
  volunteerCountCategory: references(volunteerCountCategory, true),
  workplaceType: references(workplaceType, true),
  incomeCategory: references(incomeCategory, true),
  address: references(address, true),
  legalConcept: z.string().nullish(),
  incorporationYear: z.number().int().nullish(),
  rfc: z.string().max(13).nullish(),
  donationAuthStatus: z.nativeEnum(DonationAuthStatus).nullish(),
  cluniStatus: z.nativeEnum(CLUNIStatus).nullish(),
  corporationType: references(corporationType, true),
  organizationCategory: references(unincorporatedOrgCategory, true),
  wantsToIncorporate: z.boolean().nullish(),
  logoUrl: z.string().url().nullish(),
});

export type Organization = InferEntity<typeof organization>;
