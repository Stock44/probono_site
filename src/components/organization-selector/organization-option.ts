import {type Organization} from '@prisma/client';

export type OrganizationLogoInfo = Pick<Organization, 'logoUrl' | 'name' | 'id'>;

type OrganizationOption = {
	readonly organization: OrganizationLogoInfo | null;
};

export default OrganizationOption;
