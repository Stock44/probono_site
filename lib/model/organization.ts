import { z } from "zod";
import { entitySchema, references } from "@/lib/model/index";
import { idSchema, phoneSchema } from "@/lib/model/schemas";
import { employeeCountCategorySchema } from "@/lib/model/employeeCountCategory";
import { volunteerCountCategorySchema } from "@/lib/model/volunteerCountCategory";
import { workplaceTypeSchema } from "@/lib/model/workplaceType";
import { incorporatedOrgDataSchema } from "@/lib/model/incorporatedOrgData";
import { unincorporatedOrgDataSchema } from "@/lib/model/unincorporatedOrgData";
import { incomeCategorySchema } from "@/lib/model/incomeCategory";
import { organizationOfficeSchema } from "@/lib/model/organizationOffice";

const tableName = "organization";

export const organizationSchema = entitySchema(tableName).extend({
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
  employeeCountCategory: references(employeeCountCategorySchema).nullable(),
  volunteerCountCategory: references(volunteerCountCategorySchema).nullable(),
  workplace: references(workplaceTypeSchema).nullable(),
  incorporatedOrgData: references(incorporatedOrgDataSchema).nullable(),
  unincorporatedOrgData: references(unincorporatedOrgDataSchema).nullable(),
  incomeCategory: references(incomeCategorySchema).nullable(),
  organizationOffice: references(organizationOfficeSchema).nullable(),
});

export type OrganizationSchema = typeof organizationSchema;

export type Organization = z.infer<OrganizationSchema>;

export function validateOrganization(
  data: Record<string, any>,
  omitMetadata = true,
) {
  return omitMetadata
    ? organizationSchema
        .omit({
          id: true,
          _tableName: true,
        })
        .parse(data)
    : organizationSchema.parse(data);
}
