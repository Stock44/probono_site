"use client";
import React from "react";
import { type Person } from "@/lib/models/person";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";

export default function PersonAvatar({ person }: { person: Person }) {
  return (
    <Avatar.Root className="rounded-full w-8 h-8 bg-stone-600 flex justify-center items-center">
      <Avatar.Fallback className=" w-full h-full flex justify-center items-center text-stone-300">
        {`${person.givenName[0]}${person.familyName[0]}`}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
