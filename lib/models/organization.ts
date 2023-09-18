import { z } from "zod";
import { type ExtractModel, Schema, references } from "@/lib/models/index";
import { phoneSchema } from "@/lib/models/schemas";
import { employeeCountCategory } from "@/lib/models/employeeCountCategory";
import { volunteerCountCategory } from "@/lib/models/volunteerCountCategory";
import { workplaceType } from "@/lib/models/workplaceType";
import { incorporatedOrgData } from "@/lib/models/incorporatedOrgData";
import { unincorporatedOrgData } from "@/lib/models/unincorporatedOrgData";
import { incomeCategory } from "@/lib/models/incomeCategory";
import { organizationOffice } from "@/lib/models/organizationOffice";

export const organization = new Schema("Organization", {
  name: z.string(),
  ods: z.number().int().min(1).max(30).nullable(),
  foundingYear: z.number().int().nullable(),
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
  workplace: references(workplaceType).nullable(),
  incorporatedOrgData: references(incorporatedOrgData).nullable(),
  unincorporatedOrgData: references(unincorporatedOrgData).nullable(),
  incomeCategory: references(incomeCategory).nullable(),
  organizationOffice: references(organizationOffice).nullable(),
});

export type Organization = ExtractModel<typeof organization>;
