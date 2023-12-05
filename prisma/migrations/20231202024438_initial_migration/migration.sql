-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "DonationAuthStatus" AS ENUM ('notAuthorized', 'authorized', 'inProgress', 'inRecovery');

-- CreateEnum
CREATE TYPE "CluniStatus" AS ENUM ('no', 'active', 'inactive', 'inProgress');

-- CreateTable
CREATE TABLE "ActivityCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ActivityCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationToActivity" (
    "organizationId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "OrganizationToActivity_pkey" PRIMARY KEY ("organizationId","activityId")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviatedName" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "postalCode" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "extNumber" INTEGER NOT NULL,
    "location" point,
    "municipalityId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgeGroup" (
    "id" SERIAL NOT NULL,
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER,

    CONSTRAINT "AgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationToAgeGroup" (
    "organizationId" INTEGER NOT NULL,
    "ageGroupId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "OrganizationToAgeGroup_pkey" PRIMARY KEY ("organizationId","ageGroupId")
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorporationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,

    CONSTRAINT "CorporationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeCountCategory" (
    "id" SERIAL NOT NULL,
    "minCount" INTEGER NOT NULL,
    "maxCount" INTEGER,

    CONSTRAINT "EmployeeCountCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovernmentOrganizationCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GovernmentOrganizationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovernmentOrganization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "governmentOrganizationCategoryId" INTEGER NOT NULL,

    CONSTRAINT "GovernmentOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeCategory" (
    "id" SERIAL NOT NULL,
    "minIncome" INTEGER NOT NULL,
    "maxIncome" INTEGER,

    CONSTRAINT "IncomeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerCountCategory" (
    "id" SERIAL NOT NULL,
    "minCount" INTEGER NOT NULL,
    "maxCount" INTEGER,

    CONSTRAINT "VolunteerCountCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkplaceType" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkplaceType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "OrganizationCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrganizationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geom" geometry NOT NULL,
    "municipalityId" INTEGER,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "foundingYear" INTEGER NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "hasInvestmentAgreement" BOOLEAN,
    "logoUrl" TEXT,
    "ods" INTEGER,
    "webpage" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "linkedIn" TEXT,
    "isIncorporated" BOOLEAN NOT NULL,
    "wantsToIncorporate" BOOLEAN,
    "legalConcept" TEXT,
    "incorporationYear" INTEGER,
    "rfc" TEXT,
    "donationAuthStatus" "DonationAuthStatus",
    "cluniStatus" "CluniStatus",
    "addressId" INTEGER,
    "employeeCountCategoryId" INTEGER,
    "volunteerCountCategoryId" INTEGER,
    "workplaceTypeId" INTEGER,
    "incomeCategoryId" INTEGER,
    "corporationTypeId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MunicipalityToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BeneficiaryToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GovernmentOrganizationToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_providedServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToSector" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationToActivity_priority_key" ON "OrganizationToActivity"("priority");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_addressId_key" ON "Organization"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_MunicipalityToOrganization_AB_unique" ON "_MunicipalityToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_MunicipalityToOrganization_B_index" ON "_MunicipalityToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BeneficiaryToOrganization_AB_unique" ON "_BeneficiaryToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_BeneficiaryToOrganization_B_index" ON "_BeneficiaryToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GovernmentOrganizationToOrganization_AB_unique" ON "_GovernmentOrganizationToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_GovernmentOrganizationToOrganization_B_index" ON "_GovernmentOrganizationToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_providedServices_AB_unique" ON "_providedServices"("A", "B");

-- CreateIndex
CREATE INDEX "_providedServices_B_index" ON "_providedServices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToSector_AB_unique" ON "_OrganizationToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToSector_B_index" ON "_OrganizationToSector"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToUser_AB_unique" ON "_OrganizationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToUser_B_index" ON "_OrganizationToUser"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ActivityCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationToActivity" ADD CONSTRAINT "OrganizationToActivity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationToActivity" ADD CONSTRAINT "OrganizationToActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationToAgeGroup" ADD CONSTRAINT "OrganizationToAgeGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationToAgeGroup" ADD CONSTRAINT "OrganizationToAgeGroup_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovernmentOrganization" ADD CONSTRAINT "GovernmentOrganization_governmentOrganizationCategoryId_fkey" FOREIGN KEY ("governmentOrganizationCategoryId") REFERENCES "GovernmentOrganizationCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_employeeCountCategoryId_fkey" FOREIGN KEY ("employeeCountCategoryId") REFERENCES "EmployeeCountCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_volunteerCountCategoryId_fkey" FOREIGN KEY ("volunteerCountCategoryId") REFERENCES "VolunteerCountCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_workplaceTypeId_fkey" FOREIGN KEY ("workplaceTypeId") REFERENCES "WorkplaceType"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_incomeCategoryId_fkey" FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_corporationTypeId_fkey" FOREIGN KEY ("corporationTypeId") REFERENCES "CorporationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "OrganizationCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MunicipalityToOrganization" ADD CONSTRAINT "_MunicipalityToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Municipality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MunicipalityToOrganization" ADD CONSTRAINT "_MunicipalityToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BeneficiaryToOrganization" ADD CONSTRAINT "_BeneficiaryToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Beneficiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BeneficiaryToOrganization" ADD CONSTRAINT "_BeneficiaryToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GovernmentOrganizationToOrganization" ADD CONSTRAINT "_GovernmentOrganizationToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "GovernmentOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GovernmentOrganizationToOrganization" ADD CONSTRAINT "_GovernmentOrganizationToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_providedServices" ADD CONSTRAINT "_providedServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_providedServices" ADD CONSTRAINT "_providedServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSector" ADD CONSTRAINT "_OrganizationToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSector" ADD CONSTRAINT "_OrganizationToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
