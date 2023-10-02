"use client";
import React from "react";
import PersonAvatar from "@/components/PersonAvatar";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import * as Popover from "@radix-ui/react-popover";
import axios from "axios";
import { Button } from "@/components/Button";
import Link from "next/link";
import { type Person } from ".prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";

/**
 * Renders a widget component based on the authenticated user, that contains user-related data, such as their avatar and organization link. Rendered client-side.
 *
 * @returns The rendered user widget component.
 */
export default function UserWidget() {
  const pathname = usePathname();
  const user = useUser();

  const personQuery = useQuery(
    "person",
    async () => {
      const { data } = await axios.get<Person>("/api/auth/person");
      return data;
    },
    {
      enabled: user.user != null,
      staleTime: 10 * 60 * 1000, // 10 mins,
    },
  );

  // const organizationsQuery = useQuery("userOrganizations", async () => {
  //   const { data } = await axios.get<Person>("/api/auth/person/organizations");
  //   return data;
  // });

  const person = personQuery.data;

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
                <div className="flex gap-2">
                  <Link href="/account">
                    <Button variant="secondary">Mi cuenta</Button>
                  </Link>
                  <Link href="/api/auth/logout">
                    <Button variant="secondary">Cerrar sesión</Button>
                  </Link>
                </div>
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
