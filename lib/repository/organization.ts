import { getRepositoryFactory } from "@/lib/repository/index";
import { organization } from "@/lib/models/organization";

export const getOrganizationRepository = getRepositoryFactory(organization);
