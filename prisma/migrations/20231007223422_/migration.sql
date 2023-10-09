-- CreateTable
CREATE TABLE "_MunicipalityToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MunicipalityToOrganization_AB_unique" ON "_MunicipalityToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_MunicipalityToOrganization_B_index" ON "_MunicipalityToOrganization"("B");

-- AddForeignKey
ALTER TABLE "_MunicipalityToOrganization" ADD CONSTRAINT "_MunicipalityToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Municipality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MunicipalityToOrganization" ADD CONSTRAINT "_MunicipalityToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
