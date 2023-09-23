import { z } from "zod";
import { type ExtractModel, Schema, references } from "@/lib/models/index";
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
  ods: z.number().int().min(1).max(17).nullable(),
  foundingYear: z.number().int(),
  hasInvestmentAgreement: z.boolean().nullable(),
  phone: phoneSchema.nullable(),
  email: z.string().email().nullable(),
  webpage: z.string().url().nullable(),
  facebook: z.string().url().nullable(),
  instagram: z.string().url().nullable(),
  twitter: z.string().url().nullable(),
  tiktok: z.string().url().nullable(),
  youtube: z.string().url().nullable(),
  linkedin: z.string().url().nullable(),
  employeeCountCategory: references(employeeCountCategory).nullable(),
  volunteerCountCategory: references(volunteerCountCategory).nullable(),
  workplaceType: references(workplaceType).nullable(),
  incomeCategory: references(incomeCategory).nullable(),
  address: references(address).nullable(),
  legalConcept: z.string().nullable(),
  incorporationYear: z.number().int().nullable(),
  rfc: z.string().max(13).nullable(),
  donationAuthStatus: z.nativeEnum(DonationAuthStatus).nullable(),
  cluniStatus: z.nativeEnum(CLUNIStatus).nullable(),
  corporationType: references(corporationType).nullable(),
  organizationCategory: references(unincorporatedOrgCategory).nullable(),
  wantsToIncorporate: z.boolean().nullable(),
  logoUrl: z.string().url().nullable(),
});

export type Organization = ExtractModel<typeof organization>;
