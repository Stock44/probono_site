import React from "react";
import GeneralDataForm from "@/app/organizations/create/GeneralDataForm";

export default async function CreateOrganizationPage() {
  return (
    <div className="w-full flex justify-center dark:text-stone-200 p-4">
      <GeneralDataForm handleForm={handleGeneralDataForm} />
    </div>
  );
}
