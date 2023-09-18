import React from "react";
import { getRepositoryFactory } from "@/lib/repository";
import { municipality } from "@/lib/models/municipality";
import { db } from "@/lib/db";

const getMunicipalityRepository = getRepositoryFactory(municipality);

export default async function Test() {
  const municipalities = getMunicipalityRepository(db);

  const municipality = await municipalities.get(3, ["state"]);

  if (municipality != null) {
    console.log(municipality.state.name);
  }

  return <p>Test</p>;
}
