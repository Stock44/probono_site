import React from "react";
import getLoggedInPersonOrganization from "@/lib/getLoggedInPersonOrganization";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Icon from "@/components/Icon";

export default withPageAuthRequired(async function Organization(page) {
  const organization = await getLoggedInPersonOrganization();
  return (
    <div className="pt-4 flex gap-4">
      <div className="w-64">
        <div className="border-stone-800 border rounded p-4">
          {organization.logoUrl != null ? (
            <Image
              src={organization.logoUrl}
              width={96}
              height={96}
              alt={organization.name}
              className="mb-4"
            />
          ) : (
            <div className="w-24 h-24 bg-stone-900 text-stone-50 text-4xl rounded flex items-center justify-center">
              {organization.name.substring(0, 2)}
            </div>
          )}
          <h2 className="text-stone-300 text-xl font-bold mb-4">
            {organization.name}
          </h2>
          {organization.phone != null ? (
            <p className="text-stone-300 flex gap-2 mb-4 text-sm">
              <Icon iconName="phone" />
              {organization.phone}
            </p>
          ) : null}
          {organization.email != null ? (
            <p className="text-stone-300 flex gap-2 text-sm">
              <Icon iconName="email" />
              {organization.email}
            </p>
          ) : null}
        </div>
        <div className="border border-stone-800 p-4 rounded mt-4 col-span-4">
          <h2 className="text-stone-200 text-lg mb-2">
            ¡Completa la información de tu organización!
          </h2>
          <p className="text-stone-300">
            El tener mas información sobre ustedes nos ayuda a ponerlos en el
            mapa.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-stone-200 text-4xl">Tu organización</h1>
      </div>
    </div>
  );
});
