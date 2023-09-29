"use client";
import React from "react";
import PersonAvatar from "@/components/PersonAvatar";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { type Person } from "@/lib/models/person";
import * as Popover from "@radix-ui/react-popover";
import axios from "axios";
import { Button } from "@/components/Button";
import Link from "next/link";

/**
 * Renders a widget component based on the authenticated user, that contains user-related data, such as their avatar and organization link. Rendered client-side.
 *
 * @returns The rendered user widget component.
 */
export default function UserWidget() {
  const pathname = usePathname();

  const userQuery = useQuery("user", async () => {
    const { data } = await axios.get<Person>("/api/auth/person");
    return data;
  });

  const organizationsQuery = useQuery("userOrganizations", async () => {
    const { data } = await axios.get<Person>("/api/auth/person/organizations");
    return data;
  });

  const person = userQuery.data;

  return pathname !== "/onboarding" ? (
    <>
      {person != null ? (
        <Popover.Root>
          <Popover.Trigger>
            <PersonAvatar person={person} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content align="end" sideOffset={8}>
              <div className="bg-stone-900 text-stone-300 border border-stone-800 rounded p-4">
                <p className="text-sm">Hola,</p>
                <p className="text-md mb-2">{`${person.givenName} ${person.familyName}`}</p>
                <Button className="mb-2">Mi cuenta</Button>
                <Button>Cerrar sesión</Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ) : (
        <>
          <Link href={`/api/auth/login?returnTo=${pathname}`}>
            <Button variant="secondary">Iniciar sesión</Button>
          </Link>
          <Link href={`/api/auth/signup?returnTo=${pathname}`}>
            <Button>Registra tu organización</Button>
          </Link>
        </>
      )}
    </>
  ) : null;
}
