import { getRepositoryFactory } from "@/lib/repository/index";
import { organizationSchema } from "@/lib/model/organization";

export const getOrganizationRepository =
  getRepositoryFactory(organizationSchema);
