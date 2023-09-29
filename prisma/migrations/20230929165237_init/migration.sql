-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "DonationAuthStatus" AS ENUM ('notAuthorized', 'authorized', 'inProgress', 'inRecovery');

-- CreateEnum
CREATE TYPE "CluniStatus" AS ENUM ('no', 'active', 'inactive', 'inProgress');

-- CreateTable
CREATE TABLE "OrganizationActivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrganizationActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "extNumber" INTEGER NOT NULL,
    "intNumber" INTEGER,
    "betweenStreets" TEXT,
    "location" point,
    "municipalityId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgeGroup" (
    "id" SERIAL NOT NULL,
    "gender" "Gender",
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,

    CONSTRAINT "AgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationBeneficiary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrganizationBeneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorporationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT,

    CONSTRAINT "CorporationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeCountCategory" (
    "id" SERIAL NOT NULL,
    "minCount" INTEGER NOT NULL,
    "maxCount" INTEGER NOT NULL,

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
    "maxIncome" INTEGER NOT NULL,

    CONSTRAINT "IncomeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerCountCategory" (
    "Id" SERIAL NOT NULL,
    "minCount" INTEGER NOT NULL,
    "maxCount" INTEGER NOT NULL,

    CONSTRAINT "VolunteerCountCategory_pkey" PRIMARY KEY ("Id")
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
    "serviceCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "limits" polygon NOT NULL,
    "municipalityId" INTEGER NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "foundingYear" INTEGER NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "hasInvestmendAgreement" BOOLEAN,
    "logoUrl" TEXT,
    "ods" INTEGER,
    "webpage" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "linkedIn" TEXT,
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
    "organizationCategoryId" INTEGER,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "authId" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AgeGroupToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GovernmentOrganizationToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToOrganizationActivity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToOrganizationBeneficiary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_providedServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_neededServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToSector" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToPerson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_addressId_key" ON "Organization"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_authId_key" ON "Person"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "_AgeGroupToOrganization_AB_unique" ON "_AgeGroupToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_AgeGroupToOrganization_B_index" ON "_AgeGroupToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GovernmentOrganizationToOrganization_AB_unique" ON "_GovernmentOrganizationToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_GovernmentOrganizationToOrganization_B_index" ON "_GovernmentOrganizationToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToOrganizationActivity_AB_unique" ON "_OrganizationToOrganizationActivity"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToOrganizationActivity_B_index" ON "_OrganizationToOrganizationActivity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToOrganizationBeneficiary_AB_unique" ON "_OrganizationToOrganizationBeneficiary"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToOrganizationBeneficiary_B_index" ON "_OrganizationToOrganizationBeneficiary"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_providedServices_AB_unique" ON "_providedServices"("A", "B");

-- CreateIndex
CREATE INDEX "_providedServices_B_index" ON "_providedServices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_neededServices_AB_unique" ON "_neededServices"("A", "B");

-- CreateIndex
CREATE INDEX "_neededServices_B_index" ON "_neededServices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToSector_AB_unique" ON "_OrganizationToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToSector_B_index" ON "_OrganizationToSector"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToPerson_AB_unique" ON "_OrganizationToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToPerson_B_index" ON "_OrganizationToPerson"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovernmentOrganization" ADD CONSTRAINT "GovernmentOrganization_governmentOrganizationCategoryId_fkey" FOREIGN KEY ("governmentOrganizationCategoryId") REFERENCES "GovernmentOrganizationCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_employeeCountCategoryId_fkey" FOREIGN KEY ("employeeCountCategoryId") REFERENCES "EmployeeCountCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_volunteerCountCategoryId_fkey" FOREIGN KEY ("volunteerCountCategoryId") REFERENCES "VolunteerCountCategory"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_workplaceTypeId_fkey" FOREIGN KEY ("workplaceTypeId") REFERENCES "WorkplaceType"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_incomeCategoryId_fkey" FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_corporationTypeId_fkey" FOREIGN KEY ("corporationTypeId") REFERENCES "CorporationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_organizationCategoryId_fkey" FOREIGN KEY ("organizationCategoryId") REFERENCES "OrganizationCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToOrganization" ADD CONSTRAINT "_AgeGroupToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "AgeGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgeGroupToOrganization" ADD CONSTRAINT "_AgeGroupToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GovernmentOrganizationToOrganization" ADD CONSTRAINT "_GovernmentOrganizationToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "GovernmentOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GovernmentOrganizationToOrganization" ADD CONSTRAINT "_GovernmentOrganizationToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationActivity" ADD CONSTRAINT "_OrganizationToOrganizationActivity_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationActivity" ADD CONSTRAINT "_OrganizationToOrganizationActivity_B_fkey" FOREIGN KEY ("B") REFERENCES "OrganizationActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationBeneficiary" ADD CONSTRAINT "_OrganizationToOrganizationBeneficiary_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationBeneficiary" ADD CONSTRAINT "_OrganizationToOrganizationBeneficiary_B_fkey" FOREIGN KEY ("B") REFERENCES "OrganizationBeneficiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_providedServices" ADD CONSTRAINT "_providedServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_providedServices" ADD CONSTRAINT "_providedServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_neededServices" ADD CONSTRAINT "_neededServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_neededServices" ADD CONSTRAINT "_neededServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSector" ADD CONSTRAINT "_OrganizationToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSector" ADD CONSTRAINT "_OrganizationToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToPerson" ADD CONSTRAINT "_OrganizationToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToPerson" ADD CONSTRAINT "_OrganizationToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
