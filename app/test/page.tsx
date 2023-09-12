import React from "react";
import { getRepositoryFactory } from "@/lib/repository";
import { municipalitySchema } from "@/lib/model/municipality";
import { db } from "@/lib/db";

const getMunicipalityRepository = getRepositoryFactory(municipalitySchema);

export default async function Test() {
  const municipalities = getMunicipalityRepository(db);

  const municipality = await municipalities.get(3, ["state"]);

  console.log(municipality);

  return <p>Test</p>;
}
